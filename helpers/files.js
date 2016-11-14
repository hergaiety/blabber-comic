const fs = require('fs');
const Canvas = require('canvas-prebuilt');

function isImage(fileString) {
  let ext = fileString.slice(fileString.indexOf('.'));
  return ['.png', '.jpg'].indexOf(ext) > -1;
}

function readImageFromPath(path) {
  return new Promise(resolve => {
    fs.readFile(path, (err, loadedImage) => {
      if (err) throw err;
      let img = new Canvas.Image;
      img.src = loadedImage;

      resolve(img);
    });
  }).catch(error => {
    throw error;
  });
}

module.exports = {
  isImage,
  readImageFromPath
};
