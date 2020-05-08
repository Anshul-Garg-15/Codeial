const mongoose = require('mongoose');

//to connect and give name to the database
mongoose.connect('mongodb://localhost/Codeial_Development');

//to aquire the connection in the database
const db = mongoose.connection;

//checked the error in database 
db.on('error', console.error.bind(console,'Error'));

//run the database if it hasn't an error
db.once('open' , function(){
    console.log('Connect to the DataBase :: MongoDB');
})

module.exports = db;