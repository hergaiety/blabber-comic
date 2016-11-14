const fs = require('fs');
const generate = require('./index.js');

const exampleMessages = [
  {
    user: 'Jade',
    text: 'So, two people walk into a bar'
  }, {
    user: 'Sam',
    text: 'No, don\'t',
  }, {
    user: 'Jade',
    text: 'The bartender says, why the long face?'
  }, {
    user: 'Sam',
    text: '...',
  }, {
    user: 'Kit',
    text: 'I can tell this is gonna get worse'
  }, {
    user: 'Jade',
    text: 'To get to the other side!'
  }, {
    user: 'Kit',
    text: '...WHY DO YOU DO THIS?',
  },
];

generate(exampleMessages).then(response => {
  let base64Data = response.replace(/^data:image\/png;base64,/, '');

  fs.writeFile('./comic.png', base64Data, 'base64', error => {
    if (error) console.error('Uhoh...', error);
    else console.log('Saved file as `comic.png`');
  });
}).catch(error => {
  throw error;
});
