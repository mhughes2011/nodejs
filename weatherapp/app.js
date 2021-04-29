let weather = require('./weather');
//Join multiple values passed as arguments and replaced all spaces with underscores
let query = process.argv.slice(2).join('_').replace(' ', '_');
//query: 90201
//query: Cleveland OH
//query: London_England
weather.get(query);