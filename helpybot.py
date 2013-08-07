import sys
sys.path.insert(0, 'commands')

# packages
import tweepy
from tweepy.streaming import StreamListener, Stream

# tools
import pprint
from datetime import datetime
import re

# configuration
import settings

class HelpyBot(StreamListener):
    def __init__(self, api):
        self.debug = True
        self.api = api
        self.commands = settings.commands
        self.modules = {}
        for module_name in self.commands:
          module = __import__(module_name)
          self.modules[module.matches] = module.response
        #super(HelpyBot, self).__init__()
    
    def on_status(self, status):
        # parse the incoming tweet so it's easy to process
        tweet = self.parse_status(status)
        
        # Debugging shits
        if self.debug:
          print '-' * 20
          print "New status at", datetime.now(), "|", unicode(status.text)
          pp = pprint.PrettyPrinter(indent=4)
          pp.pprint(tweet)
        
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
        print response
        api.update_status(response)
        return

if __name__ == '__main__':
    # authenticate using variables defined in settings.py
    auth = tweepy.OAuthHandler(settings.consumer_key, settings.consumer_secret)
    auth.set_access_token(settings.access_token, settings.access_token_secret)
    api = tweepy.API(auth)

    # 
    helpy = HelpyBot(api)
    stream = Stream(auth, helpy)
    
    follow_list = ['484471774']
    track_list = None
    stream.filter(follow_list, track_list)

    ''' 
    # test
    helpy = HelpyBot({})
    tweet = {
      'text': '@helpybot hello there!',
      'user': {
        'screen_name': 'blah'
      }
    }
    helpy.on_status(tweet)
    '''
