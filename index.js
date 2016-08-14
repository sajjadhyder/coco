var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

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


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


