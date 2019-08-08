// index.js
// load the things we need
var express = require('express');
var bodyParser  = require('body-parser');
var app = express();
var formidable = require('formidable'); //Form-base file upload handler
var fs = require('fs'); //save file to server
var recipts = require('./app/receipts');


const PORT = 3000;


//var recipts_datalake_path = "/home/shlomi/Desktop/HDFS/recipts/"
var recipts_datalake_path = "."; //Root folder directories do not work. You need permissions to write. Need to check other options. HDFS should do the work.


// ----------- Initilize the express engine -----------

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder
app.use(express.static(__dirname + "/public"))

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use res.render to load up an ejs view file



// ------------------ GET ------------------
// index page 
app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

app.get('/upload', function(req, res) {
    res.render('pages/upload');
});

// ------------------ POST ------------------
//When user upload file, it is redirected here.
app.post('/fileupload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
		var oldpath = files.filetoupload.path;
		var newpath = recipts_datalake_path + files.filetoupload.name; //TODO: If multiple users upload files with SAME NAME then the computer will override. Need to find a good name for each file so that it will be unique. MAybe timestamp ?

		//Read file before uploading it
		var data = fs.readFileSync(oldpath);
		console.log(data.toString());
		//Preprocess JSON to make sure it is valid
		var go = recipts.preprocess_recipt_json(data.toString());
		//If JSON is correct and valid
		if(go) {
			//var res = fs.renameSync(oldpath, newpath);
			fs.writeFileSync(newpath, data);
			console.log("Successfuly saved recipt to disk.")

			res.write('File uploaded!');
			res.end();
		} else {
			res.write('File is not a valid JSON!');
			res.end();
		}


    });
});    
/*
app.post('/register', (req, res) => {
    var r = require('./app/register');
    r.register(req, res);
});
*/

app.listen(PORT);
console.log('Server started on port ' + PORT);