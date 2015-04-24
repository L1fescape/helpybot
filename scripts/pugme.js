import request from 'request';

export default function (bot) {

  bot.command(/(pugme|pug me)/i, 'pugme - Receive a pug', (text, channel, user) => {
    var url = 'http://pugme.herokuapp.com/random';

    request(url, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        var response = JSON.parse(body).pug;
        channel.send(response);
      }
    });
  });
}
