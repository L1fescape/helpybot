var _ = require('lodash');

describe('HelpyBot', () => {
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
