var _ = require('lodash');

describe('Voting script', () => {
  beforeEach(function() {
    this.bot = new HelpyBot({
      token: '12345',
      scripts: ['vote']
    });
  });

  it('should let the user create a new topic to vote on', function() {
    var topic = 'are salamders the best';
    this.testMessage.text = `helpybot vote on ${topic}`;
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledOnce;
    expect(this.channel.send).to.have.been.calledWith(`You can now vote on "${topic}"`);
  });

  it('should let the user vote "yes" on a topic', function() {
    var topic = 'are salamders the best';
    this.testMessage.text = `helpybot vote on ${topic}`;
    this.bot.message(this.testMessage);

    this.testMessage.text = `helpybot vote yes ${topic}`;
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith('The poll is now yes:1 no:0');
  });

  it('should let the user vote "no" on a topic', function() {
    var topic = 'are salamders the best';
    this.testMessage.text = `helpybot vote on ${topic}`;
    this.bot.message(this.testMessage);

    this.testMessage.text = `helpybot vote no ${topic}`;
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith('The poll is now yes:0 no:1');
  });

  it('should let the user delete a topic', function() {
    var topic = 'are salamders the best';
    this.testMessage.text = `helpybot vote on ${topic}`;
    this.bot.message(this.testMessage);

    this.testMessage.text = `helpybot vote remove ${topic}`;
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith(`The poll "${topic}" has been removed`);

    this.testMessage.text = `helpybot vote no ${topic}`;
    this.bot.message(this.testMessage);

    expect(this.channel.send).to.have.been.calledWith('That topic does not exist');
  });

  it('should not let the user vote on a poll that does not exist', function() {
    var topic = 'are salamders the best';
    this.testMessage.text = `helpybot vote yes ${topic}`;
    this.bot.message(this.testMessage);
    expect(this.channel.send).to.have.been.calledWith('That topic does not exist');
  });
});
