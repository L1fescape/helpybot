HelpiBot
--------
[HelpiBot](https://twitter.com/#!/HelpiBot) is a twitter bot that responds to commands sent via tweet.

As of right now, the only command it responds to is 'insult'

This is a branch off of the original Helpy-Bot written by [theabraham](https://github.com/theabraham), [MarcoPolo](https://github.com/MarcoPolo), and myself for the University of Florida's 2012 Innovation Hub Hackathon.

The original project can be found here: https://github.com/theabraham/Helpy-Bot


Examples
--------
### Command
    @HelpiBot insult @A_Ken for me please.
### Response
    @A_Ken Your Mama's So fat, when she wears a yellow raincoat, people said 'Taxi!'

Installation
------------
    git clone git@github.com:L1fescape/HelpiBot.git
Head on over to twitter and create a twitter account for your bot (Alternatively you can use your already existing twitter account and have the bot reply as if it were you).

Go to https://dev.twitter.com/

Click 'Create an app'

Enter in Application Name, Description, and Website (if you don't have a website, just put in http://nooooooooooooooo.com/)

Click 'Create Application'

On the Application page, go to the 'Settings' tab

Change 'Access' under 'Application Type' to 'Read and Write' (or 'Read, Write and Access direct messages', but you need at least 'Read and Write' to post messages)

Click on the 'Details' tab, then scroll down to 'Your Access Token' and hit 'Create my access token'

Copy down your Consumer key, Consumer secret, Access token, and Access token secret.

Back in terminal:

    vim settings.py

In settings.py:

    twit_key='<Your Consumer Key Here>'

    twit_secret='<Your Consumer Secret Here>'

    oauth_token='<Your Access Token Here>'

    oauth_secret='<Your Access Token Secret Here>'

Run with

    python twitbot.py
