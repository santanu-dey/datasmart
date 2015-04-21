var conn = new Mongo("localhost:27017");
var db = conn.getDB("IoTDB");

db.createCollection("Users");


for (i=1; i<=10; i++)
{

	var name = makeid();
	user = {
			"id" : i,
			"name" : name , 
	}

	db.Users.insert(user);
}


function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}