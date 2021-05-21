var Profile = require('./profile.js');
let render = require('./render.js');
let queryString = require('querystring');
let commonHeaders = {'Content-Type': 'text/html'};

//Handle the HTTP route GET '/' and Post '/' i.e. Home
function homeRoute(request, response) {
  //if url == '/' && GET
  if(request.url === '/') {
    if(request.method.toLowerCase() === 'get') {
      //show search
      response.writeHead(200, commonHeaders);
      render.view('header', {}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    } else {
      //if url == '/' && POST
      
      //get the post data from body
      request.on('data', function(postBody) {
        //extract the username
        let query = queryString.parse(postBody.toString());
        //redirect to '/:username'
        response.writeHead(303, {'Location': '/' + query.username});
        response.end();
      });
      
    }
  } 
  
}
//Handle the HTTP route GET '/:username' i.e. /chalkers
function userRoute(request, response) {
  //if url == '/...'
  let username = request.url.replace('/', '');
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    render.view('header', {}, response);
    
    //get json from Treehouse
    let studentProfile = new Profile(username);
    //on 'end'
    studentProfile.on("end", function(profileJSON){
      //show profile
      
      //Store the value which we need
      let values = {
        avatarURL: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        name: profileJSON.name,
        badgeCount: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      //Simple response
      render.view('profile', values, response);
      render.view('footer', {}, response);
      response.end();
    });
    
    //on 'error'
    studentProfile.on("error", function(error){
      //show error
      render.view('error', {errorMessage: error.message}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;