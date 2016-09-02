var express = require('express');
const bodyParser= require('body-parser');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
app.use(bodyParser.urlencoded({extended: true}));

//--------database---------------
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://heroku_n9kwrtp6:1k04jvroh2k30rum37bt57l4ec@ds019950.mlab.com:19950/heroku_n9kwrtp6';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    // do some work here with the database.
            
            
        }   
     
    //Close connection
    db.close();
  });
//--------database---------------

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "/pages/index.html");
});

app.set('port', (process.env.PORT || 5000));

app.use("/",router);
app.use('/public', express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/index2', function(request, response) {
  response.render('pages/index2');
});
app.get('/thanks', function(request, response) {
  response.render('pages/thanks');
});
app.get('/login', function(request, response) {
  response.render('pages/login');
});
app.get('/product', function(request, response) {
  response.render('pages/product');
});
app.get('/contact', function(request, response) {
  response.render('pages/contact');
});
app.post('/contact-form', (req, res) => {
	//--------database---------------
	var mongodb = require('mongodb');

	//We need to work with "MongoClient" interface in order to connect to a mongodb server.
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = 'mongodb://heroku_n9kwrtp6:1k04jvroh2k30rum37bt57l4ec@ds019950.mlab.com:19950/heroku_n9kwrtp6';

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db){
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
    // do some work here with the database.
     	db.collection('cocofino', function (err, collection) {

     	collection.insert({ Name: req.body.name, Email: req.body.email, Mobile: req.body.mobile, message: req.body.message });
        });   

     }
    //Close connection
    db.close();
  });
	
	res.redirect('/thanks');

//--------database---------------
});

app.post('/login', (req, res) => {
	var Name= req.body.name;
	var pass = req.body.password;
 	if (Name=='admin' && pass=='root' ){
		res.redirect('/list');
 	}else{
 		res.send("Invalid data");
 	}

//--------database---------------
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


