export default function (bot) {

  var regex = /.*(smash).*/i

  bot.hear(regex, (text, channel) => {
    channel.send('Did someone say smash?')
  });
}
