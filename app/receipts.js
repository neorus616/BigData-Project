


function to_items(num_of_items, descriptions, amounts, prices, totals) {
	var arr = new Array();
	for(var i = 0; i < num_of_items; i++) {
		var desc = descriptions[i];
		var amount = amounts[i];
		var price = prices[i];
		var total = totals[i];

		//Doesn't matter really its reivial anyway
		if(price * amount != total) {
			console.error("ERROR WITH TOTAL PRICE: Description: " + desc + "Price: " + price + " Amount of items: " + amount + " is not equal to Total: " + total);
		}

		var item = {
			"description": desc,
			"amount": amount,
			"price": price,
			"total": total
		};

		arr.push(item);
	}

	return arr;
	//return JSON.stringify(arr);
}

/*
Input: receipt data
Output: receipt as JSON
Parameters:
	items - This is JSON parameter and SHOULD BE ALREADY FORMATTED
*/
function to_receipt(receipt_id, date, time, shop_name, shop_cashier_name, shop_cashier_desk_number, payment, coin, items, total) {
    return {
        "receipt-id": receipt_id,
        "date": date,
        "time": time,
        "shop" :{
            "name": shop_name,
            "cashier-name": shop_cashier_name,
            "shop-cashier-desk-number": shop_cashier_desk_number
		},
		"payment": payment,
		"coin": coin,
		"items": items,
		"total": total
    };
}


//Insert recipt to db
function insert_to_db(document) {
	// URL at which MongoDB service is running
	var url = "mongodb://localhost:27017";
	
	// A Client to MongoDB
	var MongoClient = require('mongodb').MongoClient;
	
	// Make a connection to MongoDB Service
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("big-data");
		/*
		dbo.collection("receipts").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		*/

		dbo.collection("receipts").insertOne(document, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
		});

		db.close();
	}); //end mongo connect
	
}

//app.js
var mongo = require('./mongo.js'); 
var db;
mongo.connect(function(error, my_db_connect) {
	if(error) throw error;
	var db = my_db_connect;
	db.collection('receipts').find({});
});
//db.collection('receipts').find();
//console.log(db.collection('receipts').find());

//Tests -------- do not delete!
// console.log( to_receipt(123) );
//console.log(to_items(3, ['Apple', 'Orange', 'Banana'], [1, 2, 3], [3, 5, 7], [4, 10, 21]));