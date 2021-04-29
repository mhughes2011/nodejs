// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//.js at the end of profile.js is optional
let profile = require('./profile');

//To enable the user to add the names it wants to grab at the end of the node app.js command it's...

const users = process.argv.slice(2);

//const users = ['chalkers', 'maxhughes2', 'davemcfarland'];

//users.forEach(username => {
//  getProfile(username);
//});

//The above code can be shortened to the below because it's only passing in one variable.

users.forEach(profile.get);
