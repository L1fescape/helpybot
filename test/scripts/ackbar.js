var _ = require('lodash');

describe('Ackbar script', function() {
  beforeEach(function() {
    this.bot = new HelpyBot({
      token: '12345',
      scripts: ['ackbar']
    });
  });

  it('should respond to hearing "its a trap"', function() {
    this.testMessage.text = 'its a trap';
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledOnce;
    expect(this.channel.send).to.have.been.calledWith(sinon.match(function(resp) {
      return _.includes(resp, 'i.imgur.com');
    }));
  });
});
