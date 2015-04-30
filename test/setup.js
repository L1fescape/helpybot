global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
global.expect = global.chai.expect;

global.HelpyBot = require('../lib');
var Slack = require('slack-client');
var SlackChannel = require('slack-client/src/channel');

var _ = require('lodash');

beforeEach(function() {
  this.sandbox = global.sinon.sandbox.create();

  // stub out core Slack client methods
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
});

afterEach(function() {
  this.sandbox.restore();
})
