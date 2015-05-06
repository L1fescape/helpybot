var _ = require('lodash');

describe('Poll script', () => {
  beforeEach(function() {
    this.bot = new HelpyBot({
      token: '12345',
      scripts: ['poll']
    });

    this.topic = 'what should our name be';
    this.testMessage.text = `helpybot create poll ${this.topic}`;
    this.bot.message(this.testMessage);
  });

  it('should let the user create a new poll', function() {
    expect(this.channel.send).to.have.been.calledWith(`You can now vote on "${this.topic}"`);
  });

  it('should let the user add a topic to the poll', function() {
    var vote = 'turtles';
    this.testMessage.text = `helpybot vote ${vote}`;
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith(`Poll: ${this.topic}\n${vote}: 1`);
  });

  it('should let the user add multiple topics to the poll', function() {
    this.testMessage.text = `helpybot vote turtles`;
    this.bot.message(this.testMessage);

    this.testMessage.text = `helpybot vote cats`;
    this.bot.message(this.testMessage);
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith(`Poll: ${this.topic}\nturtles: 1\ncats: 2`);
  });

  it('should let the user remove a poll', function() {
    this.testMessage.text = `helpybot remove poll`;

    this.bot.message(this.testMessage);
    expect(this.channel.send).to.have.been.calledWith('The current poll has been removed');

    this.bot.message(this.testMessage);
    expect(this.channel.send).to.have.been.calledWith('There is not currently a poll to remove');
  });

});
