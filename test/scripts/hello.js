var _ = require('lodash');

describe('Hello script', () => {
  beforeEach(function() {
    this.bot = new HelpyBot({
      token: '12345',
      scripts: ['hello']
    });
  });

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
