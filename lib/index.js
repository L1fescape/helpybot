import Slack from 'slack-client';
import _ from 'lodash';

class HelpyBot {
  constructor(options) {
    options = options || {};
    this.slack = new Slack(options.token, options.autoReconnect, options.autoMark);

    this.slack.on('open', this.open.bind(this));
    this.slack.on('message', this.message.bind(this));
    this.slack.on('error', this.error.bind(this));

    this.slack.login();
  }

  open() {
    var channels = this.slack.channels;
    var channelNames = _.map(channels, function(channel) { return channel.name; }, []);

    console.log('You are in:', channelNames.join(', '));
  }

  message(message) {
    var channel = this.slack.getChannelGroupOrDMByID(message.channel);
    var user = this.slack.getUserByID(message.user);
    var response = '';

    var text = message.text;

    var userMentioned = text.split(' ')[0].replace(/[^\w\s]/gi, '');

    var mentioned = _.includes(userMentioned, this.slack.self.id) || _.includes(userMentioned, this.slack.self.name);

    if (mentioned) {
      var command = text.split(' ').splice(1).join(' ');
      console.log(command);
      if (command === 'hi') {
        response = 'hello ' + user.name + '!';
        channel.send(response)
      } else if (command == 'bye') {
        channel.send('good riddance');
      }
    }
  }

  error(error) {
    console.error("Error:", error);
  }
}

export default HelpyBot;
