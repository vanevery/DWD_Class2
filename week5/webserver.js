//http://alpha.editor.p5js.org/shawn/sketches/rJxQKIXPz

var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

var express = require('express')
var app = express()

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), function (req, res) {
	console.log(req.file);
	if (req.file.mimetype == "image/png" || req.file.mimetype == "image/jpeg") {
		res.send("<img src=\"uploads/" + req.file.filename + "\">");
	}
	else {
		res.send("Hey that's not an image");
		//fs.remove() 
	}
	//res.sendfile(req.file, {root: './public/uploads'});
	// req.file is the uploaded file information
  	// req.body will hold the other text fields
});


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

// app.listen(9090, function () {
//   console.log('Example app listening on port 3000!')
// })

var httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(1337);


