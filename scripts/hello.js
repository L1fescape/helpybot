import _ from 'lodash';

function randomResponse(user) {
  var responses = [
    `hi ${user.name}!`,
    `hello ${user.name}!`
  ];
  return _.shuffle(responses)[0];
}

export default function (bot) {

  var regex = /^(hi|hello|hai)$/i

  bot.command(regex, 'hi - say hello!', (text, channel, user) => {
    channel.send(randomResponse(user))
  });

  bot.hear(regex, (text, channel, user) => {
    channel.send(randomResponse(user))
  });

  bot.hear(/^bye$/i, (text, channel, user) => {
    channel.send('good riddance');
  });
}
