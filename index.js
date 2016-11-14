const fs = require('fs');
const _ = require('lodash');
const Canvas = require('canvas-prebuilt');

const { parseMessages, parseCharacters } = require('./helpers/parse.js');
const { fillTextWrapped } = require('./helpers/canvas.js');
const { isImage, readImageFromPath } = require('./helpers/files.js');

const maxCharacters = 3;
const assetBackgrounds = fs.readdirSync(__dirname + '/assets/backgrounds')
  .filter(isImage)
  .map(path => __dirname + '/assets/backgrounds/' + path);
const assetCharacters = fs.readdirSync(__dirname + '/assets/characters')
  .filter(isImage)
  .map(path => __dirname + '/assets/characters/' + path);
const defaultConfig = {
  assetBackgrounds,
  assetCharacters,
  font: 'Impact',
  textColor: '#000000',
  borderColor: '#CCCCCC',
  borderWidth: 20, // px
  comicPaneSize: 500 // px square
};

const generate = function(messages, config = {}) {
  if (!messages) {
    console.error('Please supply messages...');
  }

  config = _.assign(defaultConfig, config);
  let comicPaneSize = config.comicPaneSize;

  let panels = parseMessages(messages);
  let characters = parseCharacters(messages, config);

  let imageBackground = readImageFromPath(_.sample(config.assetBackgrounds));
  let imagesCharacters = characters.map(character => readImageFromPath(character.background));
  let imagesToLoad = [imageBackground].concat(imagesCharacters);

  let canvas = new Canvas(panels.length * comicPaneSize + (config.borderWidth * (panels.length + 1)), comicPaneSize + (config.borderWidth * 2));
  let ctx = canvas.getContext('2d');

  return new Promise((resolve, reject) => {
    return Promise.all(imagesToLoad).then(loadedImages => {
      let loadedBackgroundImage = loadedImages[0];
      let loadedCharacterImages = loadedImages.slice(1);

      let characterSize = 150; // px square
      let fontsize = 20; // px

      ctx.font = fontsize + 'px ' + config.font;
      ctx.textBaseline = 'top';

      let paneLeftOffset = config.borderWidth;
      panels.forEach((panel, panelIndex) => {
        ctx.drawImage(loadedBackgroundImage, paneLeftOffset, config.borderWidth);
        ctx.fillStyle = config.borderColor;
        ctx.fillRect(paneLeftOffset - config.borderWidth, 0, config.borderWidth, canvas.height);

        characters.forEach((character, index) => {
          let alignToBottom = comicPaneSize - characterSize + config.borderWidth;
          let characterLeftOffset = paneLeftOffset + ((comicPaneSize / maxCharacters) * index);

          ctx.drawImage(loadedCharacterImages[index], characterLeftOffset, alignToBottom);
          ctx.fillStyle = config.textColor;
          fillTextWrapped(ctx, character.user, characterLeftOffset, alignToBottom - (fontsize * 2), comicPaneSize / maxCharacters, fontsize);
        });

        let previousMessageHeight = 0;
        panel.forEach((message, messageIndex) => {
          let characterIndex = _.findIndex(characters, {user: message.user});
          let top = (previousMessageHeight + (fontsize * 1.5) * messageIndex) + config.borderWidth;
          let left = paneLeftOffset + ((comicPaneSize / maxCharacters) * characterIndex);

          ctx.fillStyle = config.textColor;
          previousMessageHeight = fillTextWrapped(ctx, message.text, left, top, comicPaneSize / maxCharacters, fontsize);
        });

        paneLeftOffset += comicPaneSize + config.borderWidth;
      });

      // Comic Borders
      ctx.fillStyle = config.borderColor;
      ctx.fillRect(0, 0, canvas.width, config.borderWidth);
      ctx.fillRect(0, canvas.height - config.borderWidth, canvas.width, config.borderWidth);
      ctx.fillRect(canvas.width - config.borderWidth, 0, config.borderWidth, canvas.height);

      resolve(canvas.toDataURL());
    });
  }).catch(error => {
    throw error;
  });
}

module.exports = generate;
