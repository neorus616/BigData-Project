
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Genearator @ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function random_receipt() {
    var receipt_id = random_floor(1, 9999999);

    var date_time = random_date();
    var date = date_time.toLocaleDateString("en-US");
    var time = date_time.toLocaleTimeString("en-US");

    var shop_name = "Shlomi Market";
    var shop_cashier_name = random_string(7);
    var shop_cashier_desk_number = random_floor(1,4);

    var payment = Math.random() < 0.5 ? "cash" : "card";

    var coin = "Shekel";
    var total = 0; 
    var items_possibility = [
        {"d":"Milk", "p":5},
        {"d":"Bread", "p": 5}, 
        {"d":"Cheese"}, 
        {"d":"Coca-Cola 2 Liter", "p":8}, 
        {"d":"XL", "p": 5},
        {"d":"3 XL", "p": 11}, 
        {"d":"Water", "p": 6}, 
        {"d":"Salami", "p":15}, 
        {"d":"Chicken", "p":35}, 
        {"d":"Ketchup", "p": 10}, 
        {"d":"Mustard", "p": 10}, 
        {"d":"Yogurt", "p": 7}, 
        {"d":"Sprite", "p":5}, 
        {"d":"Coca-Cola Zero 2 Liter", "p": 8}, 
        {"d":"Sprite Zero", "p": 6}, 
        {"d":"Oil", "p": 11}
    ];

    var receipt = {
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
		"items": {},
		"total": 0
    };


    var num_of_items = random_floor(1, 6);
    var items = new Array();
    for(var i = 0; i < num_of_items; i++) {
        var item = items_possibility[random_floor(0, items_possibility.length + 1)];
        var desc = item["d"];
        var price = item["p"];

        var amount = random_floor(1,4);
        var item_total = amount * price;
        total += item_total;

        var item_json = {
            "description": desc,
            "amount": amount,
            "price": price,
            "total": item_total
        };

        items.push(item_json);
    }

    receipt["items"] = items;
    receipt["total"] = total;

    return receipt;
}

function random_date() {


    var year = random_floor(2010, 2020);
    var month = random_floor(1, 13);
    var day = random_floor(1, 32);
    var hours = random_floor(1, 25);
    var minutes = random_floor(1, 60);
    var seconds = random_floor(1, 60);

    //For debugging purposes
    
    /*
	for(var i = 0; i < 1000; i++) {
        var year = random_floor(2010, 2020);
        var month = random_floor(1, 13);
        var day = random_floor(1, 32);
        var hours = random_floor(1, 25);
        var minutes = random_floor(1, 60);
        var seconds = random_floor(1, 60);
		console.log("Year, Month, Day = " + year +" " + month + " " + day);
    }
    */
    
   return new Date(year, month, day, hours, minutes, seconds);
}

function random_floor(low, high) {
    return Math.floor(random(low, high));
} 

function random(low, high) {
	return Math.random() * (high - low) + low
}

function random_string(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }



console.log(random_receipt());