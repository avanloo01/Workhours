const express = require('express');
const app = express();
var PORT = 1337;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');

app.use(express.static('.'));

app.get('/', function(req,res){
	res.sendFile(__dirname + "/" + "index.html");
});

app.get('/add', function(req, res){
	res.sendFile(__dirname + "/" + "add.html");
});

app.post('/process_post', urlencodedParser, function (req, res) {   
   response = {  
       date:req.body.date,  
       hours:req.body.hours  
   };  
   const content = "\n" + response.date + "," + response.hours;
   fs.appendFile('data.csv', content, err => {
  	if (err) {
    		console.error(err)
    		return
  	}
    });
    return res.redirect("/index.html");
});

var server = app.listen(PORT, function(err) {
	if(err) console.log(err);
	var host = server.address().address
	var port = server.address().port
	console.log('Server running at http://127.0.0.1:1337/');

});
