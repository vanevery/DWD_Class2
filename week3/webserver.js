var config = require("./config.js");

var mongojs = require('mongojs');
var db = mongojs(config.username+":"+config.password+"@ds021989.mlab.com:21989/testingtesting", ["submissions"]);

var express = require('express')
var app = express()

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var count = 0;

var submissions_array = [];

app.get('/somethingelse', function (req, res) {
	count++;
  res.send('<html><body><h1>Something Else' + count + '</h1></body></html>')
})

app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
	res.send("You submitted: " + req.query.textfield);
	submissions_array.push(req.query.textfield);
})

app.post("/formpost", function(req, res) {
	console.log("They submitted: " + req.body.textfield);
	res.send("You Submitted: " + req.body.textfield)
	//submissions_array.push(req.body.textfield);
	db.submissions.save({"submission":req.body.textfield}, function(err, saved) {
		if( err || !saved ) console.log("Not saved");
		else console.log("Saved");
		})
})

app.get('/display', function(req, res) {
	db.submissions.find({}, function(err, saved) {
		if (err || !saved) {
  			console.log("No results");
  		}
  		else {
  			console.log(saved);
			res.render('display.ejs',{submissions_on_page:saved});
  		}	
  	})
});

// app.get('/image', function(req, res) {
// 	res.render('image.ejs',{thedata:req.query.d});
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})