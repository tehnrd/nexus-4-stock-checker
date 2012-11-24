var request = require('request');
var twilio = require('request');
var settings = require('./settings');

//Twilio variables, try to use enviroment variables first, then settings file
var twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || settings.twilioAccountSid;
var twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || settings.twilioAuthToken;
var twilioSmsEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/'+ twilioAccountSid +'/SMS/Messages';
var twilioFromPhoneNumber = process.env.TWILIO_FROM_PHONE_NUMBER || settings.twilioFromPhoneNumber;
var toPhoneNumber = process.env.TO_PHONE_NUMBER || settings.toPhoneNumber;

//Keep track of time SMS message was sent
var dateTimeSMSsent;

function checkStock(){

	//Peform a GET to retrive HTML from the google play Nexus 4 page
	request('https://play.google.com/store/devices/details?id=nexus_4_16gb', function (error, response, body) {
	
		if (!error && response.statusCode == 200) {
			//Get the current time
			var now = new Date();
			
			//Attempt to find the sold out element on the page
			if(body.indexOf('hardware-sold-out') > -1){
				console.log('Still sold out as of ' + now);
			
			}else if(now - dateTimeSMSsent < 21600000){
				//SMS was already sent withing the past 6 hours, don't send again
				console.log('SMS notication already sent within last 6 hours.');
			
			}else{
				//Probably in stock, send a SMS message.
				console.log('In stock!');
			
				//Create object with URL parameters
				var params = {
					From: twilioFromPhoneNumber,
					To: toPhoneNumber,
					Body: 'Nexus 4 16GB in stock! https://play.google.com/store/devices/details?id=nexus_4_16gb'
				};
				
				//Create auth header
				var headers = {
					Authorization: 'Basic ' + new Buffer(twilioAccountSid + ':' + twilioAuthToken).toString('base64'),
				};
			
				//Perform a POST to twilio to send the SMS
				request({uri: twilioSmsEndpoint, method: 'POST', headers: headers, form: params}, function (error, response, body) {
					if (!error && response.statusCode == 201) {
						console.log('SMS probably sent.') 
						console.log(body);
						
						//Set the dataSMSsent variable so two SMS messages are not sent every 2 mintues once phone is in stock
						dateTimeSMSsent = now;
						
					}else{
						//Output response body to log any errors with the POST
						console.log(body);
					}
				});
			}
		
		//Problem with the GET request on google play store
		}else{ 
			console.log('HTTP request error: ' + error);
		}
	});
	
	//Check stock again in 2 mintues
	setTimeout(checkStock,120000);
}

//Start checking stock of nexus 4
checkStock();