var express = require('express');
var collection = require('../models/users');
var router = express.Router();

/* GET users listing. */
router.all('*', function function_name (req, res, next) {
	res.set('Content-Type', "appliation/json");
	next();
})

// Get all items from a collection
router.get('/:collection', function(req, res, next) {
  
  collection.getAllUsers(function getDocs (all, err) {
  	
  	if (err){
  		console.log(err);
  		next(err);
  	} else {
  		res.send(JSON.stringify(all));
  	}

  });
  

});

// Get a specific item from a collection
router.get('/:collection/:id', function(req, res, next) {
  //res.send('Respond with API: '+ req.params.collection+' GET call '+req.params.id);

  collection.getUser(req.params.id, function getDocs (user, err) {
  	
  	if (err){
  		console.log(err);
  		next(err);
  	} else {
  		res.send(JSON.stringify(user));
  	}

  });

});




// POST a specific item to a collection
router.post('/:collection/', function(req, res, next) {

  collection.createUser(req.body, function callback (doc, err) {
  	if (err){
  		var error = new Error("Bad Request");
  		if (err.code == 11000){
  			error.status = 409;
  		}
  		else{
  			error.status = 400;
  		}
  		error.message = err.message;
  		next(error);
  	} else {
  		res.send(JSON.stringify(doc));
  	}
  	// body...
  })

});

// Update a specific item from a collection
router.put('/:collection/:id', function(req, res, next) {
  res.send('Respond with API: '+ req.params.collection+' PUT call '+req.params.id);
});

// Delete a specific item from a collection
router.delete('/:collection/:id', function(req, res, next) {
  
  collection.deleteUser(req.params.id, function callback (err) {
  	console.log('Inside callback');
  	res.status(202).send();
  	
  });

});

module.exports = router;
