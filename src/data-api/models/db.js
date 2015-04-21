var mongoose = require('mongoose');

//TODO: get from config files
mongoose.connect('mongodb://localhost/IoTDB');

/* 
Use this base controller to manage connections 
Read db configurations from package file 
Basically some common stuff
*/

mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function (callback) {
});


module.exports=mongoDB;