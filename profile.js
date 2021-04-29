//Require https module.  This is needed for the get request when connecting to the API.
const https = require('https');

//Require http module for status codes
const http = require('http');

//Print error messages.  This is refactoring the errors in the below try-catch blocks to make it easier to handle in one spot with one function call.
function printError(error) {
  console.error(error.message);
}

//Function to print message to console.
function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} point(s) in JavaScript`;
  console.log(message);
}


function get(username) {
  try{
    //Connect to the API URL (https://teamtreehouse.com/<username>.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = "";
        //Read the data when it loads, hence the on.(data) method.  JSON data is delivered in chunks so it keeps adding data to the body variable as it loads in the form of a string.
        response.on('data', data => {
          body += data.toString();
        });
        
        //Once all of the data is loaded it parses it and displays it to the console.
        response.on('end', () => {
          //This try catch block is for when the user doesn't exist.
          try{
            //Parse the data because it's a string
            let profile = JSON.parse(body);
            //Print the data from the API
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
        });
      } else {
        let message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        let statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
  
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

//You need to include an export of what you want the users to have access to if you create a module.
module.exports.get = get;
