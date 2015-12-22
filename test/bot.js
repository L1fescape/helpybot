'use strict';

var _ = require('lodash');

describe('HelpyBot', function() {
  describe('Initialization', function() {
    it('should throw an error if no slack token is provided', function() {
      expect(function() {
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

  describe('Helper Methods', function() {
    it('should throw an error if a requested channel could not be found', function() {
      var bot = new HelpyBot({
        token: '12345'
      });
      expect(function() {
        bot.getChannel('asdf');
      }).to.throw;
    });

    it('should throw an error if a requested user could not be found', function() {
      var bot = new HelpyBot({
        token: '12345'
      });
      expect(function() {
        bot.getUser('asdf');
      }).to.throw;
    });
  });
});
