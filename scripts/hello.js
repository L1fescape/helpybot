export default function (bot) {

  var regex = /^(hi|hello|hai)$/i

  bot.command(regex, 'hi - say hello!', (text, channel, user) => {
    var response = 'hello ' + user.name + '!';
    channel.send(response)
  });

  bot.hear(regex, (text, channel, user) => {
    var response = 'hello ' + user.name + '!';
    channel.send(response)
  });

  bot.hear(/^bye$/i, (text, channel, user) => {
    channel.send('good riddance');
  });
}
