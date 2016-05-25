var _ = require('lodash');

var util = {
  isBotMentioned: function(text, botNames) {
    if (!text) {
      return false;
    }
    var userMentioned = text.split(' ')[0].replace(/[^\w\s]/gi, '');
    return _.includes(botNames, userMentioned);
  },

  parseCommand: function(text, botNames) {
    if (!text) {
      return '';
    }
    var words = text.split(' ');
    // if the bot's name is the first word, remove it
    if (util.isBotMentioned(text, botNames)) {
      words = words.splice(1);
    }
    return util.normalizeText(words.join(' '));
  },

  normalizeText: function(text) {
    if (!text) {
      return '';
    }
    return text.replace(/(\r\n|\n|\r)/gi, '');
  }
};

module.exports = util;
