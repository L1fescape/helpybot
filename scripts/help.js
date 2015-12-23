var _ = require('lodash');

module.exports = function(bot) {

  var regex = /^(help)$/i;
  var helpText = 'help - print out help text';

  bot.command(regex, helpText, function(text, channel, user) {
    var response = 'Here is a list of my available commands:\n';

    _.each(bot.triggers.oncommand, function(command) {
      if (command.helpText) {
        response += command.helpText + '\n';
      }
    });

    channel.send(response)
  });
}
