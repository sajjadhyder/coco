var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
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
    console.log('baatabase is', db);


    // do some work here with the database.
    	var db = 
        var collection = db.collection('users');

    //Create some users
    var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
    var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

    // Insert some users
    collection.insert([user1, user2, user3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }

    //Close connection
    db.close();
  }
});

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
app.get('/product', function(request, response) {
  response.render('pages/product');
});
app.get('/contact', function(request, response) {
  response.render('pages/contact');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


