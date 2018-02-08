var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var count = 0;

var submissions = [];

app.get('/somethingelse', function (req, res) {
	count++;
  res.send('<html><body><h1>Something Else' + count + '</h1></body></html>')
})

app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
	res.send("You submitted: " + req.query.textfield);
	submissions.push(req.query.textfield);
})

app.post("/formpost", function(req, res) {
	console.log("They submitted: " + req.body.textfield);
	res.send("You Submitted: " + req.body.textfield)
})

app.get('/display', function(req, res) {
	var html = "<html><body>";
	for (var i = 0; i < submissions.length; i++) {
		html = html + submissions[i] + "<br>";
	}
	html = html + "</body></html>";
	res.send(html);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})