# packages
import tweepy
from tweepy.streaming import StreamListener, Stream

# tools
import pprint
from datetime import datetime
import re

# configuration
import settings

# include 'commands' as part of the sys path
import sys
sys.path.insert(0, 'commands')


class HelpyBot(StreamListener):
    def __init__(self, api):
        self.debug = True
        self.api = api
        self.commands = settings.commands
        self.modules = {}
        for module_name in self.commands:
          module = __import__(module_name)
          self.modules[module.matches] = module.response
        super(HelpyBot, self).__init__()
    
    def on_status(self, status):
        # parse the incoming tweet so it's easy to process
        tweet = self.parse_status(status)
        
        # Debugging
        if self.debug:
          print '-' * 20
          print datetime.now()
          print "Tweet: \t\t", unicode(status.text)
        
        # Subscribing to tweets from helpy bot includes tweets it sends out.
        # Don't parse those.
        if (not re.match('@helpybot', tweet['target'])):
            return

        # If command matches an available command, run the command. Does this
        # by looping through all of the enabled commands' regular expressions
        # checking for matches
        for module_regex in self.modules:
          command = re.compile(module_regex)
          if command.match(tweet['command']):
            self.modules[module_regex](self, tweet)

        return

    def parse_status(self, status):
        tokens = status.text.lower().split()
        tweet = {}
        tweet['target'] = tokens[0]
        tweet['command'] = tokens[1].strip('.,!?')
        tweet['text'] = tokens[2:]
        tweet['raw_text'] = ' '.join(tokens[2:])
        tweet['sender'] = status.user.screen_name
        tweet['targets'] = []
        for x in tweet['text']:
            if "@" in x:
                tweet['targets'].append(x.strip('@.,!?')) 
        return tweet

    def post_tweet(self, response, tweet):
        if self.debug:
          print "Response: \t", unicode(response)
        api.update_status(response)
        return

if __name__ == '__main__':
    # authenticate using variables defined in settings.py
    auth = tweepy.OAuthHandler(settings.consumer_key, settings.consumer_secret)
    auth.set_access_token(settings.access_token, settings.access_token_secret)
    api = tweepy.API(auth)

    # initialize helpybot and stream listener
    helpy = HelpyBot(api)
    stream = Stream(auth, helpy)
    follow_list = [settings.user_id]
    track_list = None
    stream.filter(follow_list, track_list)
