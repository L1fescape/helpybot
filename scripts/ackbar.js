var ackbars = [
  'http://i.imgur.com/FdzgF6f.jpg',
  'http://i.imgur.com/fKndUjh.jpg',
  'http://i.imgur.com/4x6BR3U.jpg',
  'http://i.imgur.com/tGDHeRE.jpg',
  'http://i.imgur.com/52sEi8m.jpg',
  'http://i.imgur.com/zsn3PYI.jpg',
  'http://i.imgur.com/bxYaYsA.jpg',
  'http://i.imgur.com/oQGXS1g.jpg',
  'http://i.imgur.com/cOEkBPi.jpg',
  'http://i.imgur.com/ySKx91J.gif',
  'http://i.imgur.com/SItXASa.jpg'
];

var tarps = [
  'http://i.imgur.com/Sv2OYGU.gif',
  'http://i.imgur.com/YHgDWmz.jpg',
  'http://i.imgur.com/2Eo7Pqs.jpg',
  'http://i.imgur.com/5h2RptE.jpg'
];

export default function (bot) {

  bot.hear(/it'?s a trap/i, 'it\'s a trap - Display an Admiral Ackbar piece of wonder', (text, channel) => {
    channel.send(ackbars[Math.floor(Math.random()*ackbars.length)]);
  });

  bot.hear(/it'?s a tarp/i, (msg) => {
    channel.send(tarps[Math.floor(Math.random()*tarps.length)]);
  });
}
