let https = require('https');
let api = require('./api.json');
let http = require('http');

//Print out temp details
function printWeather(weather) {
  let message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
  console.log(message);
}

//Print out error message
function printError(error) {
  console.error(error.message);
}

function get(query) {
  //Take out underscores for readability
  let readableQuery = query.replace('_', ' ');
  try{
    let request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, res     => {
      if(res.statusCode === 200) {
        let body = '';
        //Read the data
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => {
          try{
            //Parse data
            let weather = JSON.parse(body);
            //Check if the location was found before printing
            if(weather.location) {
              //Print the data
              printWeather(weather);  
            } else {
              let queryError = new Error(`The location "${readableQuery}" was not found.`);
              printError(queryError);
            }
          } catch(error) {
            //Parse Error
            printError(error);
          }
        });
      } else{
        //Status Code Error
        let statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[res.statusCode]})`);
        printError(statusCodeError);
      }
    });
    
  
  } catch(error) {
    //Malformed URL error
    printError(error);
  }
}

module.exports.get = get;