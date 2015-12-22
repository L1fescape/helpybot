var _ = require('lodash');

function randomResponse(user) {
  var responses = [
    'hi ' + user.name + '!',
    'hello ' + user.name + '!'
  ];
  return _.shuffle(responses)[0];
}

module.exports = function(bot) {

  var regex = /^(hi|hello|hai|yo)$/i

  bot.command(regex, 'hi - say hello!', function(text, channel, user) {
    channel.send(randomResponse(user))
  });

  bot.hear(regex, function(text, channel, user) {
    channel.send(randomResponse(user))
  });

  bot.hear(/^bye$/i, function(text, channel, user) {
    channel.send('good riddance');
  });
}
