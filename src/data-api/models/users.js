var mongoose = require('mongoose');
var db = require('./db');



userSchema = mongoose.Schema({
	id: Number,
	name: String
}, {
	collection: 'Users'
});
userModel = mongoose.model('User', userSchema);
// module.exports = userModel;


exports.getAllUsers = function(callback, err) {

	userModel.find({}, function(err, allDocuments) {
		console.log("Inside base model 4");
		if (err) return console.error(err);
		console.log(allDocuments)
		callback(allDocuments);

	});


};

exports.createUser = function(body, callback, err) {

	var doc = new userModel(body);

	doc.save(function(err, document) {
		console.log("saving " + JSON.stringify(body));
		if (err) return console.error(err);
		console.log(document)
		callback(document);

	});

};