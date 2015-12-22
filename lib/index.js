'use strict';

var Class = require('backbone-metal').Class;
var Slack = require('slack-client');
var chalk = require('chalk');
var util = require('./util');
var _ = require('lodash');

module.exports = Class.extend({
  initialize: function(options) {
    options = _.extend({}, {
      autoReconnect: true,
      autoMark: true,
      scripts: [],
      scriptsDir: '../scripts/',
      debug: false
    }, options);

    this.debug = options.debug;

    if (!options.token) {
      throw new Error('You must provide a slack token');
    }

    this.loadScripts(options.scripts, options.scriptsDir);

    this.initSlackClient(
      options.token,
      options.autoReconnect,
      options.autoMark
    );
  },

  getChannels: function() {
    return this.slack.channels;
  },

  getChannel: function(channelID) {
    var channel = this.slack.getChannelGroupOrDMByID(channelID) ||
                  this.slack.getChannelByName(channelID);

    if (!channel) {
      var msg = 'Slack channel "' + channelID + '" could not be found. Verify ';
      msg += 'the channel exists and the bot has permission to access it';

      this.error(msg);
    }

    return channel;
  },

  getUser: function(userID) {
    var user = this.slack.getUserByID(userID) ||
               this.slack.getUserByName(userID);

    if (!user) {
      this.error('User "' + userID + '" could not be found.');
    }

    return user;
  },

  command: function(regex, helpText, fn) {
    this.respond('command', regex, helpText, fn);
  },

  hear: function(regex, helpText, fn) {
    this.respond('hear', regex, helpText, fn);
  },


  initSlackClient: function(token, autoReconnect, autoMark) {
    this.slack = new Slack(token, autoReconnect, autoMark);
    this.slack.on('open', this.open.bind(this));
    this.slack.on('message', this.message.bind(this));
    this.slack.on('error', this.error.bind(this));

    this.slack.login();
  },

  triggers: {
    oncommand: [],
    onhear: []
  },

  loadScripts: function(scripts, scriptsDir) {
    // loop through all scripts enabled in settings and import them
    _.each(scripts, function(script){
      if (this.debug) {
        var msg = chalk.blue('Loading script: ') + script + chalk.blue('... ');
        process.stdout.write(msg);
      }

      try {
        require(scriptsDir + script)(this);
        if (this.debug){
          process.stdout.write(chalk.blue('done\n'));
        }
      }
      catch (err) {
        if (this.debug) {
          this.error(err);
        }
      }
    }, this);
  },

  open: function() {
    var channels = this.getChannels();
    var channelNames = _.map(channels, function(channel) {
      return channel.name;
    }, []).join(', ');

    if (this.debug){
      var msg = chalk.blue('You are in channels: ') + channelNames + '\n';
      process.stdout.write(msg);
    }
  },

  message: function(message) {
    var channel = this.getChannel(message.channel);
    var user = this.getUser(message.user);
    var aliases = [
      this.slack.self.name,
      this.slack.self.id
    ];

    var text = message.text;
    var mentioned = util.isBotMentioned(text, aliases);

    if (mentioned) {
      var command = util.parseCommand(text, aliases);
      this.checkCommands(command, text, channel, user);
    }
    this.checkHeard(text, channel, user);
  },

  error: function(err) {
    process.stdout.write(chalk.red('Error: '));
    process.stdout.write(err);
    process.stdout.write('\n\n');

    if (this.debug) {
      console.log(chalk.blue('Stack Trace:'));
      console.log(new Error().stack);
    }
  },

  respond: function(type, regex, helpText, fn) {
    if (!type) {
      type = 'command';
    }
    // if helpText is a function, then it's probably supposed to be the callback
    // and the script has no provided help text
    if (typeof helpText === 'function') {
      fn = helpText;
      helpText = null;
    }

    if (type === 'command') {
      this.triggers.oncommand.push({
        regex: regex,
        command: fn,
        helpText: helpText
      });
    }

    if (type === 'hear') {
      this.triggers.onhear.push({
        regex: regex,
        command: fn,
        helpText: helpText
      });
    }
  },

  checkCommands: function(command, text, channel, user) {
    if (!command) {
      return;
    }
    _.each(this.triggers.oncommand, function(obj) {
      var match = command.match(obj.regex);
      if (match && match.length) {
        obj.command(command, channel, user);
      }
    });
  },

  checkHeard: function(text, channel, user) {
    text = util.normalizeText(text);
    if (!text) {
      return;
    }
    _.each(this.triggers.onhear, function(obj) {
      var match = text.match(obj.regex);
      if (match && match.length) {
        obj.command(text, channel, user);
      }
    });
  }
});
