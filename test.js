require('babel/register');
var expect = require('chai').expect;
var sinon = require('sinon');

var HelpyBot = require('./lib');
var Slack = require('slack-client');

describe('HelpyBot tests', function() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it('should throw an error if no slack token is provided', function() {
    expect(function() {
      new HelpyBot();
    }).to.throw('You must provide a slack token');
  });

  it('should try to login if a slack token is provided', function() {
    this.sandbox.stub(Slack.login);
    var bot = new HelpyBot({
      token: '12345'
    });
    expect(Slack.login).to.have.been.calledOnce;
  });
});
