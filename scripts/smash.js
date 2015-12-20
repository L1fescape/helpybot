module.exports = function (bot) {

  var regex = /.*(smash).*/i

  bot.hear(regex, function(text, channel) {
    channel.send('Did someone say smash?')
  });
}
