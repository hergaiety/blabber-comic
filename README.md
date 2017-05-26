# Blabber-Comic

[![npm version](https://badge.fury.io/js/blabber-comic.svg)](https://badge.fury.io/js/blabber-comic)

## Sample

![Preview](/comic.png)

## How it works

Powered by Node and a node-canvas a comic can automatically be generated from a json array of users/text and some characters/backgrounds to be chosen at random.

## How to use it from the CLI

### Installing

`npm install -g blabber-comic`

### Using

```
$ blabber
$ Who?: Glen
$ Said What?: Test 1
$ Another? (y/n) y
$ Who?: Sarah
$ Said What?: Test 2
$ Another? (y/n) y
$ Who?: Glen
$ Said What?: Test 3
$ Another? (y/n) n
$ Generating Comic...
$ [ Comic Generated @ comics/1.png ]
```

### Additional Options

```
$ blabber --path ~/Pictures
```

## How to use it in other projects

### Generate base64Data

```javascript
const blabbercomic = require('blabber-comic');
let messages = [] // Array of messages...

blabbercomic(messages).then(response => {
  console.log('Generated comic as base64 data', response);
}).catch(error => {
  throw error;
});
```

### Save as file with `fs`

Example included in project. Clone then run `npm run test`.

```javascript
const blabbercomic = require('blabber-comic');
const fs = require('fs');
let messages = [] // Array of messages...

blabbercomic(messages).then(response => {
  let base64Data = response.replace(/^data:image\/png;base64,/, '');

  fs.writeFile('./storage/comics/comic.png', base64Data, 'base64', error => {
    if (error) console.error('Uhoh...', error);
    else console.log('Saved file as `comic.png`');
  });
}).catch(error => {
  throw error;
});
```

### Customizing characters and backgrounds

```javascript
const blabbercomic = require('blabber-comic');
let backgrounds = ['./assets/backgrounds/1.png', './assets/backgrounds/2.png'];
let characters = ['./assets/characters/1.png', './assets/characters/2.png', './assets/characters/3.png']; // Provide at least 3
let comicSize = 500; // in px square
let borderColor ='#CCCCCC';
let font = 'Impact';
let textColor: '#000000';

let messages = [] // Array of messages...
let config = { backgrounds, characters, comicSize, borderColor, font, textColor };

blabbercomic(messages, config);
```

---

## Special thanks to:

* [node-canvas](https://github.com/Automattic/node-canvas) by Cairo
* avatars by Iulia Ardeleanu from the Noun Project
* backgrounds by Olga Libby from Subtle Patterns
