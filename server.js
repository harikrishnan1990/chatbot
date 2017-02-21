var express = require('express')
var app = express();


app.use("/chatbot",express.static('public'));


app.get('/', function (req, res) {
  res.send('Working!!!');
});


app.get('/check',function(req,res){
  res.send('The server is working');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
});

