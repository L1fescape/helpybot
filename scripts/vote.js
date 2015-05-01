import _ from 'lodash';

export default function (bot) {

  var topics = {};
  var regex = {
    voteOn: /^(vote on) (.*)$/i,
    voteYes: /^(vote yes) (.*)$/i,
    voteNo: /^(vote no) (.*)$/i,
    voteRemove: /^(vote remove) (.*)$/i
  };


  bot.command(regex.voteOn, (command, channel, user) => {
    var topic = command.match(regex.voteOn)[2];

    if (!_.isUndefined(topic[topic])) {
      channel.send('That topic already exists');
      return;
    }

    topics[topic] = {
      creator: user.id,
      yes: 0,
      no: 0
    };

    channel.send(`You can now vote on "${topic}"`)
  });

  bot.command(regex.voteYes, (command, channel, user) => {
    var topic = command.match(regex.voteYes)[2];

    if (_.isUndefined(topics[topic])) {
      channel.send('That topic does not exist');
      return;
    }

    topics[topic].yes++;

    channel.send(`The poll is now yes:${topics[topic].yes} no:${topics[topic].no}`)
  });

  bot.command(regex.voteNo, (command, channel, user) => {
    var topic = command.match(regex.voteNo)[2];

    if (_.isUndefined(topics[topic])) {
      channel.send('That topic does not exist');
      return;
    }

    topics[topic].no++;

    channel.send(`The poll is now yes:${topics[topic].yes} no:${topics[topic].no}`)
  });

  bot.command(regex.voteRemove, (command, channel, user) => {
    var topic = command.match(regex.voteRemove)[2];

    if (_.isUndefined(topics[topic])) {
      channel.send('That topic does not exist');
      return;
    }

    if (user.id !== topics[topic].creator) {
      channel.send('Only the poll creator can remove this poll');
      return;
    }

    delete topics[topic];
    channel.send(`The poll "${topic}" has been removed`)
  });

}
