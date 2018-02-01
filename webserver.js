var express = require('express')
var app = express()

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var count = 0;

app.get('/somethingelse', function (req, res) {
	count++;
  res.send('<html><body><h1>Something Else' + count + '</h1></body></html>')
})

app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
	res.send("You submitted: " + req.query.textfield);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})