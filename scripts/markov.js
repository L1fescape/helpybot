export default function (bot) {

  var responses = [];

  bot.hear(/^(markov)/i, (text, channel, user) => {
    channel.send(responses[Math.floor(Math.random()*responses.length)])
  });

  bot.hear(/(.*?)/i, (text) => {
    responses.push(text);
  });
}
