var Slack = require('slack-client');
var _ = require('lodash');

var token = process.env.SLACK_TOKEN;
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark)

slack.on('open', function() {
  var channels = slack.channels;
  var channelNames = _.map(channels, function(channel) { return channel.name; }, []);

  console.log('You are in:', channelNames.join(', '));
});

slack.on('message', function(message) {
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);
  var response = '';

  var type = message.type;
  var ts = message.ts;
  var text = message.text;

  console.log(text);

  if (text === 'hi') {
    response = 'hello ' + user.name + '!';
    channel.send(response)
  }
});

slack.on('error', function(error) {
  console.error("Error:", error);
});

slack.login()
