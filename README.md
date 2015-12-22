![Helpy Bot](http://i.imgur.com/7NptCgF.png)

## HelpyBot [![Build Status](https://travis-ci.org/akenn/helpybot.svg?branch=master)](https://travis-ci.org/akenn/helpybot)

> A Slack Bot inspired by [Hubot](https://github.com/github/hubot)

### Install

```
npm install
```

### Start

```
SLACK_TOKEN=[your slack token] npm start
```

### Scripts

- hi - Say hello!
- pug me - You won't regret it
- it's a trap - Display an Admiral Ackbar piece of wonder
- smash - Did someone say it?

### API

##### bot.getChannels()

##### bot.getChannel(String channelName | String channelID)

##### bot.getUser(String channelName)

##### bot.command(RegEx regex, String helpText, Function callback)

##### bot.hear(RegEx regex, String helpText, Function callback)

### Tests

```
npm test
```

### Credits 

- [Ibrahim Al Rajhi](https://github.com/theabraham) - made the sweet HelpyBot icon

### License

MIT license. Copyright [Andrew Kennedy](https://akenn.org)
