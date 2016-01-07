var _ = require('lodash');

module.exports = function(bot) {

  var regex = /^(say) (.*)$/i

  bot.command(regex, 'say - repeat something', function(text, channel, user) {
    var whatToSay = text.match(regex)[2];
    channel.send(whatToSay);
  });
}
