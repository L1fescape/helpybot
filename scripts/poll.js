import _ from 'lodash';

export default function (bot) {

  var poll = {};
  var regex = {
    pollCreate: /^(create poll) (.*)$/i,
    pollVote: /^(vote) (.*)$/i,
    pollRemove: /^(remove poll)$/i
  };


  bot.command(regex.pollCreate, (command, channel, user) => {
    var topic = command.match(regex.pollCreate)[2];

    poll = {
      topic: topic,
      creator: user.id,
      votes: {}
    };

    channel.send(`You can now vote on "${topic}"`)
  });

  bot.command(regex.pollVote, (command, channel, user) => {
    var vote = command.match(regex.pollVote)[2];

    if (_.isEmpty(poll)) {
      channel.send('There is not currently a poll');
      return;
    }

    var topic = poll.topic;

    if (poll.votes[vote]) {
      poll.votes[vote]++;
    } else {
      poll.votes[vote] = 1;
    }

    var message = `Poll: ${topic}`;
    _.each(poll.votes, function(value, key) {
      message += `\n${key}: ${value}`;
    });

    channel.send(message);
  });

  bot.command(regex.pollRemove, (command, channel, user) => {
    if (_.isEmpty(poll)) {
      channel.send('There is not currently a poll to remove');
      return;
    }

    poll = {};

    channel.send('The current poll has been removed');
  });

}
