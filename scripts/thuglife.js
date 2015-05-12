import _ from 'lodash';

var thugs = [
  'https://www.youtube.com/watch?v=x0rJW5Qyc-o'
];

export default function (bot) {
  bot.hear(/(thug life|thuglife)/i, (text, channel, user) => {
    channel.send(_.shuffle(thugs)[0]);
  });
}
