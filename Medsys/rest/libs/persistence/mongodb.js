/*
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/octopusDb";

var createDb = function (){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database created!");
	  db.close();
	});
}

// Create collection
var createCollection = function(collection){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.createCollection(collection, function(err, res) {
	    if (err) throw err;
	    console.log("Collection created!");
	    db.close();
	  });
	});
}


/*
* Insert Objects
* Base response:
* res:{
	result:{ok: <1 or 0>, n: <int>},
	ops:[{<object_data>, _id:<objectId>}],
	insertedCount: <int>,
	insertedIds: [<objectId>]
}
*/
var insert = {
	// Insert obj in collection
	obj:function(collection,obj,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  //var expobj = { name: "Company Inc", address: "Highway 37" };
		  db.collection(collection).insertOne(obj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
		    db.close();
		    callback(res);
		  });
		});
	},


	// Insert multiple objects in collection
	objects: function(collection,objects,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  //var expobj = [{ name: 'xablau', address: 'xablolandia'}];
		  db.collection(collection).insertMany(objects, function(err, res) {
		    if (err) throw err;
		    console.log("Number of documents inserted: " + res.insertedCount);
		    db.close();
		    callback(res);
		  });
		});
	}
}

/*
* Search Objects
* Base response:
* res:[{<object_data>, _id:<objectId>}]
* @param collection <String>
* @param obj {<Object>}
* @param callback <function(<param>)>
*/
var search = {
	//Search one object
	one : function(collection, obj,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.collection(collection).findOne(obj, function(err, result) {
		    if (err) throw err;
		    console.log("Searching on %s [Done]",collection);
		    db.close();
		    callback(result);
		  });
		});
	},

	//Search Multiple Objects
	multiple: function(collection,obj,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.collection(collection).find(obj, function(err, result) {
		    if (err) throw err;
		    console.log("Searching on %s [Done]",collection);
		    db.close();
		    callback(result);
		  });
		});
	},

	/* Search filtered Objects
	* @param filter {<Object>}
	*/
	filtered: function(collection,obj,filter,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.collection(collection).find(obj, filter).toArray(function(err, result) {
		    if (err) throw err;
		    console.log("Searching on %s [Done]",collection);
		    db.close();
		    callback(result);
		  });
		});
	},

	/* Search By query - Including Regular expression
	* @param query {<Object>}
	*/
	query: function(collection, query,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  //var query = { address: "xablolandia" };
		  db.collection(collection).find(query).toArray(function(err, result) {
		    if (err) throw err;
		    console.log(result);
		    db.close();
		    callback(result);
		  });
		});

	}
}

/*
* Update Objects
* Base response:
* res:[{<object_data>, _id:<objectId>}]
* @param collection <String>
* @param query {<Object>}
* @param values {<Object>}
* @param callback <function(<param>)>
*/
var update  = {

	//Update one Value per time
	one: function(collection,query,values,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  //var myquery = { address: "Xablolandia" };
		  //var newvalues = { name: "Sr Xablau", address: "Townsville" };
		  db.collection(query).updateOne(query, values, function(err, res) {
		    if (err) throw err;
		    console.log("1 document updated");
		    db.close();
		    callback(res);
		  });
		});
	},

	//Update multiple Values
	multiple: function(collection,query,values,callback){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  //var newvalues = {$set: {name: "Minnie"} };
		  db.collection(query).updateMany(query, values, function(err, res) {
		    if (err) throw err;
		    console.log(res.result.nModified + " document(s) updated");
		    db.close();
		    callback(res);
		  });
		});
	}


}


module.exports = {createDb: createDb, createCollection: createCollection, insert: insert, search: search, update: update}