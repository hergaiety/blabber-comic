#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const argv = require('yargs')
.usage('Usage: blabber [options]')
.option('path')
.help()
.version()
.wrap(process.stdout.columns)
.argv;
const blabberComic = require('./');

prompt.start();

const promptMessage = [{
  description: 'Who?',
  name: 'user'
}, {
  description: 'Said what?',
  name: 'text'
}];
const promptMore = {
  description: 'Another? y/n',
  pattern: /y|n/i,
  message: 'Please type y(es) or n(o) for More',
  default: 'y',
};

function askForMessage(callback, conversation = []) {
  prompt.get(promptMessage, (error, response) => {
    conversation.push(response);
    callback(conversation);
  });
}

function askIfMore(conversation) {
  prompt.get(promptMore, (error, response) => {
    let shouldContinue = response.question.toLowerCase() === 'y';

    if (shouldContinue) askForMessage(askIfMore, conversation);
    else generate(conversation);
  });
}

function generate(conversation) {
  console.log('Generating Comic...');

  blabberComic(conversation)
  .then(rawBase64 => rawBase64.replace(/^data:image\/png;base64,/, ''))
  .then(base64 => {
    let filePath = argv.path || './';
    let fileName = Math.floor(Date.now() + Math.random()) + '.png';
    let fileOutput = path.join(filePath, fileName);

    fs.writeFile(fileOutput, base64, 'base64', error => {
      if(error) throw error;
      else console.log('[ Comic Generated @ ' + fileOutput + ' ]');
    });
  })
  .catch(error => { console.error('Uhoh... something went wrong.', error); });
}

askForMessage(askIfMore);
