// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https module.  This is needed for the get request when connecting to the API.
const https = require('https');

//Function to print message to console.
function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} point(s) in JavaScript`;
  console.log(message);
}


function getProfile(username) {
  //Connect to the API URL (https://teamtreehouse.com/<username>.json)
  const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    let body = "";
    //Read the data when it loads, hence the on.(data) method.  JSON data is delivered in chunks so it keeps adding data to the body variable as it loads in the form of a string.
    response.on('data', data => {
      body += data.toString();
    });
    
    //Once all of the data is loaded it parses it and displays it to the console.
    response.on('end', () => {
      //Parse the data because it's a string
      let profile = JSON.parse(body);
      //Print the data from the API
      printMessage(username, profile.badges.length, profile.points.JavaScript);
    });
  });
}

//To enable the user to add the names it wants to grab at the end of the node app.js command it's...

const users = process.argv.slice(2);

//const users = ['chalkers', 'maxhughes2', 'davemcfarland'];

users.forEach(username => {
  getProfile(username);
});

//The above code can be shortened to the below because it's only passing in one variable.
//
//users.forEach(getProfile);
