import _ from 'lodash'

export function isBotMentioned(text, botNames) {
  if (!text) {
    return false;
  }
  var userMentioned = text.split(' ')[0].replace(/[^\w\s]/gi, '');
  return _.includes(botNames, userMentioned);
}

export function parseCommand(text, botNames) {
  if (!text) {
    return '';
  }
  var words = text.split(' ');
  // if the bot's name is the first word, remove it
  if (isBotMentioned(text, botNames)) {
    words = words.splice(1);
  }
  return this.normalizeText(words.join(' '));
}

export function normalizeText(text) {
  if (!text) {
    return '';
  }
  return text.replace(/(\r\n|\n|\r|[^\w\s])/gi, '');
}
