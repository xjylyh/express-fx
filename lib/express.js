const http = require('http');
const url = require('url');
const Application = require('./application')
function createAppliction(){
    return new Application();
}
module.exports = createAppliction;