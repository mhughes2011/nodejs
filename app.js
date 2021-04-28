// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https module.  This is needed for the get request when connecting to the API.
const https = require('https');
const username = "maxhughes2";

//Function to print message to console.
function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} point(s) in JavaScript`;
  console.log(message);
}

//Connect to the API URL (https://teamtreehouse.com/<username>.json)

const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
  let body = "";
  //Read the data
  response.on('data', data => {
    body += data.toString();
  });
  
  response.on('end', () => {
    //Parse the data because it's a string
    let profile = JSON.parse(body);
    //Print the data from the API
    printMessage(username, profile.badges.length, profile.points.JavaScript);
  });
});

