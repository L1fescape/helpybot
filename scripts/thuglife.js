var _ = require('lodash');

var thugs = [
  'https://www.youtube.com/watch?v=x0rJW5Qyc-o',
  'https://youtu.be/cBKfP327XMU',
  'https://youtu.be/1sowq_HBF3E',
  'https://youtu.be/LxX4iYL8KcQ',
  'https://youtu.be/fYh0C815I7Y',
  'https://youtu.be/YTs6l9JHs5w',
  'https://youtu.be/YTs6l9JHs5w',
  'https://youtu.be/zIPKyuvtfc4',
  'https://youtu.be/-9xvAMNllzs',
  'https://youtu.be/ONT7DTPy0Zc'
];

module.exports = function (bot) {
  bot.hear(/(thug life|thuglife)/i, function(text, channel, user) {
    channel.send(_.shuffle(thugs)[0]);
  });
}
