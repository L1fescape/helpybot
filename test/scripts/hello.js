var _ = require('lodash');

describe('Hello script', function() {
  beforeEach(function() {
    this.bot = new HelpyBot({
      token: '12345',
      scripts: ['hello']
    });
  });

  it('should respond to hearing "hi"', function() {
    var name = this.user.name;
    this.testMessage.text = 'hi';
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith(sinon.match(function(resp) {
      return resp === 'hi ' + name + '!' || resp === 'hello ' + name + '!'
    }));
  })

  it('should respond to the command "hi"', function() {
    var name = this.user.name;
    this.testMessage.text = 'helpybot hi';
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith(sinon.match(function(resp) {
      return resp === 'hi ' + name + '!' || resp === 'hello ' + name + '!'
    }));
  });

  it('should respond to hearing "bye"', function() {
    this.testMessage.text = 'bye';
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith('good riddance');
  });
});
