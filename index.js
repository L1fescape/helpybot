import HelpyBot from './lib';

new HelpyBot({
  token: process.env.SLACK_TOKEN,
  debug: true,
  scripts: [
    'hello',
    'pugme',
    'ackbar'
  ]
});
