var express = require('express');
var session = require('express-session');

var bodyParser = require('body-parser');

var db = require('./server/dbconfig');
var User = require('./server/models/user');
var Link = require('./server/models/link');
var Collection = require('./server/models/collection');
var cookieParser = require('cookie-parser');

app = express();

//probably uneeded b/c templates generated client side
// var partials = require('express-partials');
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(partials());

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({secret: "bob the builder"}));
app.use(express.static(__dirname + '/public'));

//routes:
app.get('/', function(req, res){
  res.end("hello world");
})




console.log('Curates is listening on 3000');
app.listen(3000);
