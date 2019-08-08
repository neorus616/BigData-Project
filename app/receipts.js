

//Inout: Number of items, Array of descriptions/amounts/prices/totals
//Output: Items json
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

//Preprocess string, check that is valid JSON, then check if valid receipt JSON format
function preprocess_recipt_json(str) {
	var isJSON = isJson(str);
	if(isJSON == false)
		return false;

	var json = JSON.parse(str);
	console.log("Printing json:....");
	var receipt_id = json["receipt-id"];
	var date = json["date"];
	var time = json["time"];
	var shop = json["shop"];
	var payment = json["payment"];
	var coin = json["coin"];
	var items = json["items"];
	var total = json["total"];

	console.log(receipt_id);
	console.log("----------");
	console.log(date);
	console.log("----------");
	console.log(time);
	console.log("----------");
	console.log(shop);
	console.log("----------");
	console.log(payment);
	console.log("----------");
	console.log(coin);
	console.log("----------");
	console.log(items);
	console.log("----------");
	console.log(total);
	console.log("----------");
	
	if(receipt_id && date && time && shop && payment && coin && items && total) {

		//Check shop
		var shop_name = shop["name"];
		var shop_cashier_name = shop["cashier-name"];
		var shop_cashier_desk_number = shop["cashier-desk-number"];
		console.log("Checking shop");
		if(shop_name && shop_cashier_name && shop_cashier_desk_number) {
			//Checking items
			var items_len = items.length;
			if( ! items_len) return false;

			var sum = 0; //Check if sum is equal to 'total' at the end of calculation
			for(var i = 0; i < items_len; i++) {
				var item = items[i];
				//Per item...
				var desc = item["description"];
				var amount = item["amount"];
				var price = item["price"];
				var item_total = item["total"];

				if(desc && amount && price && item_total) {
					sum += price * amount;
				} else {
					return false;
				}
			}//end for
			if(sum == total) {
				insert_to_db(json);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}

}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
	preprocess_recipt_json
};

//app.js
/*
var mongo = require('./mongo.js'); 
var db;
mongo.connect(function(error, my_db_connect) {
	if(error) throw error;
	var db = my_db_connect;
	db.collection('receipts').find({});
});
*/
//db.collection('receipts').find();
//console.log(db.collection('receipts').find());

//Tests -------- do not delete!
// console.log( to_receipt(123) );
//console.log(to_items(3, ['Apple', 'Orange', 'Banana'], [1, 2, 3], [3, 5, 7], [4, 10, 21]));


