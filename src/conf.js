const confJson = require('../public/conf.json');
const conf = JSON.parse(JSON.stringify(confJson));

console.log('conf.js:', conf);
module.exports = conf;
