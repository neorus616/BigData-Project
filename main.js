


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
// console.log( to_receipt(123) );

console.log(to_items(3, ['Apple', 'Orange', 'Banana'], [1, 2, 3], [3, 5, 7], [4, 10, 21]));