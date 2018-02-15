//http://alpha.editor.p5js.org/shawn/sketches/rJxQKIXPz

var express = require('express')
var app = express()


var data = [];

app.get('/save', function(req, res) {
	var datatosave = {x: req.query.x, y: req.query.y};
	data.push(datatosave);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.send('{response: "thanks"}');	
});

app.get("/send", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.send(data);
})

app.listen(9090, function () {
  console.log('Example app listening on port 3000!')
})