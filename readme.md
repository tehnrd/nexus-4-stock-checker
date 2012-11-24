# Nexus 4 Stock Checker #

This simple node.js app screen scrapes the google play store every couple of minutes to see if the Nexus 4 phone is in stock. If it appears the phone is in stock a SMS message will be sent using Twilio to notify the recipient the phone is now in stock.

## Setup ##
To authenticate and send SMS messages with Twilio you will need to create a settings file that contains all of your Twilo information such as the AccountSid, AuthToken, and phone numbers that will be used to send and receive the SMS messages. In the main director create the following file with the necessary values:

Filename: settings.js

><pre>
module.exports = {  
    twilioAccountSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXX',  
    twilioAuthToken: '6dc9XXXXXXXXXXXXXXXXXXXXXXXXXXX',  
    twilioFromPhoneNumber: '12069999999',  
    toPhoneNumber: '12068888888'  
};
</pre>

Instead of using the settings file you can also set the following environmental variables:

><pre>TWILIO_ACCOUNT_SID   
TWILIO_AUTH_TOKEN  
TWILIO_FROM_PHONE_NUMBER  
TO_PHONE_NUMBER</pre>

## Run ##
To run execute the following command in the main project directory.

<pre>
	node app
</pre>

