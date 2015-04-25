import Slack from 'slack-client';
import chalk from 'chalk';
import * as util from './util';
import _ from 'lodash';

class HelpyBot {
  constructor(options) {
    options = _.defaults(options, {
      autoReconnect: true,
      autoMark: true,
      scripts: [],
      scriptsDir: '../scripts/',
      debug: false
    });

    this.debug = options.debug;

    this.slack = new Slack(options.token, options.autoReconnect, options.autoMark);
    this.slack.on('open', this.open.bind(this));
    this.slack.on('message', this.message.bind(this));
    this.slack.on('error', this.error.bind(this));

    this.triggers = {
      oncommand: [],
      onhear: []
    };
    this.loadScripts(options.scripts, options.scriptsDir);

    this.slack.login();
  }

  loadScripts(scripts, scriptsDir) {
    // loop through all scripts enabled in settings and import them
    _.each(scripts, function(script){
      if (this.debug) {
        process.stdout.write(`${chalk.blue('Loading script:')} ${script} ${chalk.blue('...')} `);
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

  open() {
    var channels = this.slack.channels;
    var channelNames = _.map(channels, (channel) => { return channel.name; }, []).join(', ');

    if (this.debug){
      process.stdout.write(`${chalk.blue('You are in channels:')} ${channelNames} \n`);
    }
  }

  message(message) {
    var channel = this.slack.getChannelGroupOrDMByID(message.channel);
    var user = this.slack.getUserByID(message.user);
    var aliases = [
      this.slack.self.name,
      this.slack.self.id
    ];

    var text = message.text;

    var mentioned = !!channel.is_im || util.isBotMentioned(text, aliases);

    if (mentioned) {
      var command = util.parseCommand(text, aliases);
      this.checkCommands(command, text, user, channel);
    }
    this.checkHeard(text, user, channel);
  }

  error(err) {
    process.stdout.write(`${chalk.red('error')} \n'`);
    console.warn(err);
  }

  respond(type, regex, helpText, fn) {
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

  command(regex, helpText, fn) {
    this.respond('command', regex, helpText, fn);
  }

  hear(regex, helpText, fn) {
    this.respond('hear', regex, helpText, fn);
  }


  checkCommands(command, text, user, channel) {
    if (!command) {
      return;
    }
    _.each(this.triggers.oncommand, (obj) => {
      var match = command.match(obj.regex);
      if (match && match.length) {
        obj.command(text, channel, user);
      }
    });
  }

  checkHeard(text, user, channel) {
    text = util.normalizeText(text);
    if (!text) {
      return;
    }
    _.each(this.triggers.onhear, (obj) => {
      var match = text.match(obj.regex);
      if (match && match.length) {
        obj.command(text, channel, user);
      }
    });
  }
}

export default HelpyBot;
