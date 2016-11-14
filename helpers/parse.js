const _ = require('lodash');

/**
 * Parsing Linear Messages to a comic friendly format
 * Expects: Array of messages, containing the text and the user.
 * Returns: Array of panels, containing messages, containing the text and the user.
 */
function parseMessages(messages) {
  let structuredMessages = [[]];
  let usersInCurrentPanel = [];

  messages.forEach(message => {
    let isUserInCurrentPanel = usersInCurrentPanel.indexOf(message.user) > -1;

    if (isUserInCurrentPanel) {
      structuredMessages.push([message]); // New panel
      usersInCurrentPanel = [message.user]; // Reset
    } else {
      structuredMessages[structuredMessages.length - 1]
        .push(message); // Add to current panel
      usersInCurrentPanel.push(message.user); // Save user in current panel
    }
  });
  return structuredMessages;
}

function parseCharacters(messages, config) {
  let users = messages.map(message => message.user);
  let uniqueUsers = _.uniq(users);
  let characterImages = _.sampleSize(config.assetCharacters, uniqueUsers.length);
  return uniqueUsers.map((user, index) => {
    return {user, background: characterImages[index]};
  });
}

module.exports = {
  parseMessages,
  parseCharacters
};
