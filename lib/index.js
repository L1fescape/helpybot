var Slack = require('slack-client');
var chalk = require('chalk');
var util = require('./util');
var _ = require('lodash');

var HelpyBot = function (options){
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
    return;
  }

  this.slack = new Slack(options.token, options.autoReconnect, options.autoMark);
  this.slack.on('open', this.open.bind(this));
  this.slack.on('message', this.message.bind(this));
  this.slack.on('error', this.error.bind(this));

  this.loadScripts(options.scripts, options.scriptsDir);

  this.slack.login();
};

HelpyBot.prototype.triggers = {
  oncommand: [],
  onhear: []
}

HelpyBot.prototype.loadScripts = function(scripts, scriptsDir) {
  // loop through all scripts enabled in settings and import them
  _.each(scripts, function(script){
    if (this.debug) {
      var message = chalk.blue('Loading script: ') + script + chalk.blue('... ');
      process.stdout.write(message);
    }

    try {
      require(scriptsDir + script)(this);
      if (this.debug){
        process.stdout.write(`${chalk.blue('done')} \n`);
      }
    }
    catch (err) {
      if (this.debug) {
        this.error(err);
      }
    }
  }, this);
}

HelpyBot.prototype.open = function() {
  var channels = this.slack.channels;
  var channelNames = _.map(channels, function(channel) {
    return channel.name;
  }, []).join(', ');

  if (this.debug){
    var message = chalk.blue('You are in channels: ') + channelNames + '\n';
    process.stdout.write(message);
  }
}

HelpyBot.prototype.message = function(message) {
  var channel = this.slack.getChannelGroupOrDMByID(message.channel);
  var user = this.slack.getUserByID(message.user);
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
}

HelpyBot.prototype.error = function(err) {
  process.stdout.write(chalk.red('error\n'));
  console.warn(err);
}

HelpyBot.prototype.respond = function(type, regex, helpText, fn) {
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
    this.triggers.oncommand.push({ regex: regex, command: fn, helpText: helpText });
  }

  if (type === 'hear') {
    this.triggers.onhear.push({ regex: regex, command: fn, helpText: helpText });
  }
}

HelpyBot.prototype.command = function(regex, helpText, fn) {
  this.respond('command', regex, helpText, fn);
}

HelpyBot.prototype.hear = function(regex, helpText, fn) {
  this.respond('hear', regex, helpText, fn);
}

HelpyBot.prototype.checkCommands = function(command, text, channel, user) {
  if (!command) {
    return;
  }
  _.each(this.triggers.oncommand, function(obj) {
    var match = command.match(obj.regex);
    if (match && match.length) {
      obj.command(command, channel, user);
    }
  });
}

HelpyBot.prototype.checkHeard = function(text, channel, user) {
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

module.exports = HelpyBot;
