//mongo.js
var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

function connect(callback) {
    MongoClient.connect(url, function(err, db) { 
      if (err) return callback(err);
      console.log("Connected to MongoDB!");
      callback(false, db.db("big-data"));
    });
  }

module.exports = {
    connect
};