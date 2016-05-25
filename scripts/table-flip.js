var _ = require('lodash');

function randomResponse(user) {
  var responses = [
    '┬─┬ ノ( ゜-゜ノ)'
  ];
  return _.shuffle(responses)[0];
}

module.exports = function(bot) {

  var regex = /(\┻\━\┻)/i;

  bot.command(regex, function(text, channel, user) {
    channel.send(randomResponse(user))
  });

  bot.hear(regex, function(text, channel, user) {
    channel.send(randomResponse(user))
  });
}
