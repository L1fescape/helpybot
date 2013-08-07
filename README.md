# Helpy Bot

[HelpyBot](https://twitter.com/HelpyBot) is a twitter bot that responds to commands sent via tweet.

## Commands 
Don't worry, there will be many more

* `hi`


## Examples

    @HelpyBot hi there!
    Well hello there @L1fescape!

## Installation

1. `git clone git@github.com:L1fescape/HelpyBot.git`
2. `pip install -r requirements.txt`
3. Create a Twitter account for your bot (Alternatively you can use your personal twitter account and have the bot reply as if it were you).
4. Go to [dev.twitter.com](https://dev.twitter.com/), create an application, and grab the Consumer key, Consumer secret, Access token, and Access token secret.
5. Create a file called `settings.py` with the following contents:

<pre><code># list of enabled commands
    commands = ["hello"]
    # twitter api settings
    consumer_key="Your Consumer Key Here"
    consumer_secret="Your Consumer Secret Here"
    access_token="Your Access Token Here"
    access_token_secret="Your Access Token Secret Here"```
</code></pre>

## Running

    python helpybot.py


# Acknowledgements

* [Ibrahim Al Rajhi](https://github.com/theabraham)
* [Marco Munizaga](https://github.com/MarcoPolo)

This is a branch off of the [original Helpy Bot](https://github.com/theabraham/Helpy-Bot) written by [theabraham](https://github.com/theabraham), [MarcoPolo](https://github.com/MarcoPolo), and I for the 2012 UF Innovation Hub Hackathon. We got second place! 
