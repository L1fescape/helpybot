var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var _ = require('lodash');

var HelpyBot = require('./lib');
var Slack = require('slack-client');
var SlackChannel = require('slack-client/src/Channel');

describe('HelpyBot', () => {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.stub(Slack.prototype, 'login');
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it('should throw an error if no slack token is provided', function() {
    expect(() => {
      new HelpyBot();
    }).to.throw('You must provide a slack token');
  });

  it('should try to login if a slack token is provided', function() {
    var bot = new HelpyBot({
      token: '12345'
    });
    expect(bot.slack.login).to.have.been.calledOnce;
  });
});

describe('Scripts', () => {
  beforeEach(function() {
    // stub out core Slack client methods
    this.sandbox = sinon.sandbox.create();
    this.sandbox.stub(SlackChannel.prototype, 'send');
    this.sandbox.stub(Slack.prototype, 'getChannelGroupOrDMByID', _.identity);
    this.sandbox.stub(Slack.prototype, 'getUserByID', _.identity);
    this.sandbox.stub(Slack.prototype, 'login', function(){
      this.self = {
        id: 1,
        name: 'helpybot'
      };
    });

    // create a test user, message, and channel
    this.user = { name: 'Andrew' };
    this.channel = new SlackChannel();
    this.testMessage = {
      channel: this.channel,
      user: this.user,
      text: ''
    };

    // initialize the bot
    this.bot = new HelpyBot({
      token: '12345',
      scripts: ['hello']
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('Hello', function() {
    it('should respond to hearing "hi"', function() {
      var user = this.user;
      this.testMessage.text = 'hi';
      this.bot.message(this.testMessage);

      expect(this.channel.send).to.have.been.calledOnce;
      expect(this.channel.send).to.have.been.calledWith(sinon.match(function(resp) {
        return resp === `hi ${user.name}!` || resp === `hello ${user.name}!`
      }));
    });

    it('should respond to the command "hi"', function() {
      var user = this.user;
      this.testMessage.text = 'helpybot hi';
      this.bot.message(this.testMessage);

      expect(this.channel.send).to.have.been.calledOnce;
      expect(this.channel.send).to.have.been.calledWith(sinon.match(function(resp) {
        return resp === `hi ${user.name}!` || resp === `hello ${user.name}!`
      }));
    });

    it('should respond to hearing "bye"', function() {
      this.testMessage.text = 'bye';
      this.bot.message(this.testMessage);

      expect(this.channel.send).to.have.been.calledOnce;
      expect(this.channel.send).to.have.been.calledWith('good riddance');
    });
  });
});
