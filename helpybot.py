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
        self.api = api
        self.commands = settings.commands
        super(HelpyBot, self).__init__()
    
    def on_status(self, status):
        # parse the incoming tweet so it's easier to process later
        tweet = self.parse_status(status)
        
        # Debugging shits
        print '-' * 20
        print "New status at", datetime.now(), "|", unicode(status.text)
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(tweet)
        
        # Subscribing to tweets from helpy bot includes tweets it sends out.
        # Don't parse those.
        if (not re.match('@helpybot', tweet['target'])):
            return

        # If command matches the set of available commands, run the command.
        # Else throw an error.
        if (tweet['command'] in self.commands):
          getattr(self, tweet['command'])(tweet)
        else:
          print '[Helpy] Error - unknown command %s' % tweet['command']

        return

    def parse_status(self, status):
        tokens = status.text.lower().split()
        print tokens 
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
        post = response
        print tweet['targets']
        api.update_status(post)
        return


    ''' Functions '''
    
    def hi(self, tweet):
      target = "@" + tweet['sender']
      response = 'Well hi there ' + target + '!'
      self.post_tweet(response, tweet)
      return
    

if __name__ == '__main__':
    '''
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

