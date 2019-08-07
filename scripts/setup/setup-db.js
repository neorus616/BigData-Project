use big-data;
db.receipts.insertOne({"test":"test", "Description": "THis is a test document intended for use to Shlomi, Sagi, and the other one"});
db.receipts.find().pretty();

//db.receipts.drop();