use big-data;
db.receipts.insertOne({"test":"test"});
db.receipts.find().pretty();

db.receipts.drop();