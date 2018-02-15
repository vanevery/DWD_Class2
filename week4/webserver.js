
var express = require('express')
var app = express()


var data = [];

app.get('/save', function(req, res) {
	var datatosave = {x: req.query.x, y: req.query.y};
	data.push(datatosave);
	res.send('{response: "thanks"}');	
});

app.get("/send", function(req, res) {
	res.send(data);
})

app.listen(9090, function () {
  console.log('Example app listening on port 3000!')
})