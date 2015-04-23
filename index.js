import HelpyBot from './lib';

new HelpyBot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});
