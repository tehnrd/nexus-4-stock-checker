# Nexus 4 Stock Checker #

This simple node.js app screen scrapes the google play store every couple of minutes to see if the Nexus 4 phone is in stock. If it appears the phone is in stock a SMS message will be sent using Twilio to notify the recipient the phone is now in stock.

## Setup ##
To authenticate and send SMS messages with Twilio you may need to create a settings file that contains all of your Twilo information such as the AccountSid, AuthToken, and phone numbers that will be used to send and receive the SMS messages. In the main director create the following file with the necessary values:

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

## Run Locally ##
To run locally execute the following command in the main project directory.

<pre>
	node app
</pre>

## Run on Heroku ##

To run on Heroku be sure the environment variables above are set in your app. If running on Heroku you also need to create an environment variable named DEPLOYMENT_LOCATION and the value should be 'heroku'. This will prevent the app from attempting to load the settings.js file as it is not included in the git repository and won't be present when deployed to Heroku.

