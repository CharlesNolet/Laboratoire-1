const http = require('http');
const url = require('url');
module.exports = http.createServer((req, res) => {
  var options = require('./controller.js');
  const reqUrl =  url.parse(req.url, true);
  
  // GET endpoint
  if(reqUrl.pathname == '/api/maths' && req.method === 'GET') 
  {
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    options.maths(req, res);
  }

  // URL invalide
 else 
  {
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    options.invalidUrl(req, res);
  }
})