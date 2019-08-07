// index.js
// load the things we need
var express = require('express');
var bodyParser  = require('body-parser');
var app = express();

const PORT = 3000 //Remember to port forward 80:3000 in router's settings




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
/*
app.post('/register', (req, res) => {
    var r = require('./app/register');
    r.register(req, res);
});
*/

app.listen(PORT);
console.log('Server started on port ' + PORT);