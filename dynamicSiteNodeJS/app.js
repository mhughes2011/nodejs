//Problem: We need a simple way to look at a user's badge count and JavaSCript points from a web browser
//Solution: Use NOde.js to perform a the profile look ups and serve our template via HTTP

let router = require('./router.js');

//Create a web server

let http = require('http');
http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(3000);
console.log('Server running at http://<workspace-url>/');

