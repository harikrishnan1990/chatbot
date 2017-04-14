var express = require('express')
var app = express();
var send = require('gmail-send');
var Gmailer = require("gmail-sender");

var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var queryString = require('querystring');


var options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('cert.cer')
};


var post_data = {
 "MemberId": 2474437,
 "LocationId": 2,
 "StartDatetime": "2018-03-28T06:31:10.405685+00:00",
 "EndDatetime": "2018-03-29T06:31:10.405685+00:00",
 "ReservationFeeId": 3,
 "ReservationFeatures": [
 ],
 "PaymentMethodId": 4,
 "FeeDollars": 5.0,
 "FeePoints": 1,
 "ReservationFeeCreditId": 0,
 "ReservationFeeDiscountId": 1,
 "CreditCardId": 1,
 "PayPalPaymentId": "",
 "PayPalPayerId": "",
 "ReservationSource": "",
 "EstimatedReservationCost": 9.0,
 "MemberNote": "",
 "TermsAndConditionsFlag": true,
 "SendNotificationsFlag": true,
 "SaveReservationPreferencesFlag": true
};


var locations = {
  "Albuquerque" : {
	 locationId : 1,
         reservationId :2 
   },
  
   "Atlanta" : {
         locationId : 18,
         reservationId :17
   },

   "Austin" : {
         locationId :2,
         reservationId :3
   },


   "Baltimore" : {
         locationId :3,
         reservationId :4
   },


   "Cincinnati" : {
         locationId :9,
         reservationId :8
   },


   "Cleveland" : {
         locationId :6,
         reservationId :6
   },


   "Houston" : {
         locationId :16,
         reservationId :15
   },

   "Indianapolis" : {
         locationId :17,
         reservationId :16
   },

  	
   "Memphis" : {
         locationId :15,
         reservationId :14
   },

   "Miami" : {
         locationId :14,
         reservationId :13
   },

   "Orlando" : {
         locationId :12,
         reservationId :11
   },

   "Raleigh" : {
         locationId :10,
         reservationId :9
   },

   "Tucson" : {
         locationId :11,
         reservationId :10
   }

};


var postOptions = {
  host: '52.40.189.219',
  path: '/api/v1/reservations',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'ApplicationKey':'301C01F6-450E-4D97-B522-CD69EF25B574',
    'AccessToken':'1.1.1.1'
  }
};

//app.use(express.bodyParser());

app.use("/chatbot",express.static('public'));

app.use("/hari",express.static('hari-fireworks'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.get('/check',function(req,res){

  console.log();
  res.send('The server is working');
});


app.post('/location',function(request,response){

console.log("REQUEST FROM API.AI:\n\n", request.body);
console.log("\n\n\nRESPONSE FROM FAST PARK:\n\n");
var requestObject = http.request(postOptions, function(res) {

res.setEncoding('utf8');
 res.on('data', function(chunk) {
 	 console.log(chunk);
 });

});

var airPortName = request.body.result.parameters.AirportName;
post_data.LocationId=locations[airPortName].locationId;
post_data.ReservationFeeId=locations[airPortName].reservationId;

var datePeriod = request.body.result.parameters["date-period"];

var dateArray = datePeriod.split("/");
post_data.startDatetime = dateArray[0];
post_data.endDatetime = dateArray[1];

requestObject.write(JSON.stringify(post_data));

requestObject.end();


 response.json({"speech": "Your Reservation has been booked",
"displayText": "Your Reservation has been booked",
"data": {},
"contextOut": [],
"source": "FastPark"});



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

/*app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
});*/

http.createServer(app).listen(5000);
// Create an HTTPS service identical to the HTTP service.
//https.createServer(options, app).listen(5000);

