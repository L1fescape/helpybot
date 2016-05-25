var HelpyBot = require('./lib');

new HelpyBot({
  token: process.env.SLACK_TOKEN,
  debug: true,
  scripts: [
    'help',
    'hello',
    'pugme',
    'ackbar',
    'say',
    'smash',
    'thuglife',
    'table-flip'
  ]
});
