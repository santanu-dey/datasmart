var mongoose = require('mongoose');
var db = require('./db');



userSchema = mongoose.Schema({
	userId: { type: String, index: { unique: true, dropDups: true } },
	firstName: String,
	lastName: String,
	email: String,
	createdAt: String,
	modifiedAt: String,
	state: Boolean
}, {
	collection: 'Users'
});
userModel = mongoose.model('User', userSchema);
// module.exports = userModel;


exports.getAllUsers = function(callback, err) {

	userModel.find({}, function(err, allDocuments) {
		if (err) 
		{
			callback(err);
		}
		callback(allDocuments);

	});


};

exports.getUser = function(user_id, callback, err) {

	userModel.findOne({userId:user_id}).where('state').equals(true).exec(function(err, user) {
		if (err || !user) 
		{
			console.log(err);
			error = new Error("Not Found")
			error.status =  404;
			error.message = "Resource Not Available"
			callback(null, error);
		}else{
		callback(user);
		}

	});


};

exports.createUser = function(body, callback, err) {

	var doc = new userModel(body);
	doc.state = true;

	doc.save(function(err, document) {
		// console.log("creating " + JSON.stringify(body));
		if (err) 
		{
			callback(null, err);
		}else{
			callback(document);
		}

	});

};

exports.updateUser = function(body, callback, err) {

	var doc = new userModel(body);

	doc.save(function(err, document) {
		console.log("updating " + JSON.stringify(body));
		if (err) 
		{
			callback(err);
		}
		console.log(document)
		callback(document);

	});

};

exports.deleteUser = function(user_id, callback, err) {

	userModel.find({ userId:user_id }).remove( function  (err) {
		console.log("deleting user with user id: " + user_id);
		if (err) 
		{
			callback(err);
		}
		
		console.log("user with user id: " + user_id +" deleted");
		callback();
	} );

};