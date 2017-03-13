var express = require('express')
var app = express();
var send = require('gmail-send');
var Gmailer = require("gmail-sender");

app.use("/chatbot",express.static('public'));

app.use("/hari",express.static('hari-fireworks'));

app.get('/', function (req, res) {
  res.send('Working!!!');
});


app.get('/check',function(req,res){
  res.send('The server is working');
});

app.get('/sendEmail',function(req,res){

/*send({                         
   user: 'apitaker@gmail.com',               // Your GMail account used to send emails 
  pass: 'pvwmitwqvhmmcxos',             // Application-specific password 
  to:   'apitaker@gmail.com',      // Send back to yourself 
  from:   'apitaker@gmail.com',  // from: by default equals to user 
  replyTo:'apitaker@gmail.com',           // replyTo: by default undefined 
  subject: 'test subject',
  text:    'test text'
}, function (err, res) {
  console.log('* [example1] send(): err:', err, '; res:', res);
  res.send({"error": err, "response":res});
});
*/

var testEmail = validateEmail(req.query.emailId);

if(testEmail){
// any options can be set here...
Gmailer.options({
	smtp: {
		service: "Gmail",
		user: "apitaker@gmail.com",
		pass: "ulgilinwmeszaokg"
	}
});

// any options set here, will overwrite options from above...
Gmailer.send({
	subject: "Thank You for chatting with us. We will get back to you soon.",
	template: "./assets/email/email.html",
	from: "'Costrategix Ltd'",
	to: {
    	email: req.query.emailId,
    	name: "Costrategix",
    	surname: "Client"
	},
	data: {
    	name: "Five",
    	surname: "Johnny",
    	id: "28329m82198j"
	},
	attachments: [
    	{
        	fileName: "html5.png",
        	filePath: "./assets/attachments/html5.png",
        	cid: "html5@demo"
    	}
	]
});
   res.json({"status":"success"});
}
else{
   res.json({"status":"failure"});
}

});

function validateEmail(email)
{
 var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
 if (reg.test(email)){
    return true;
 }
 else{
    return false;
 }
}

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
});

