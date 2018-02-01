var express = require('express')
var app = express()

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/somethingelse', function (req, res) {
  res.send('<html><body><h1>Something Else</h1></body></html>')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})