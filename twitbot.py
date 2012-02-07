import random
import re
import tweepy
from tweepy.streaming import StreamListener, Stream
from settings import *
import pprint
from datetime import datetime

class HelpiBot(StreamListener):
    def __init__(self, api):
        self.api = api
        self.commands = ['insult']
        super(HelpiBot, self).__init__()
    
    def on_status(self, status):
        print '-' * 20
        print "New status at", datetime.now(), "|", unicode(status.text)
        tweet = self.parse_status(status)
        
        if (not re.match('@helpibot', tweet['target'])):
            print '[Helpi] Tweet not meant for Helpy Bot.'
            return
        if (tweet['targets'] == []):
            if (tweet['command'] in self.commands):
                getattr(self, tweet['command'])(tweet)
            else:
                print '[Helpy] Error - unknown command %s' % tweet['command']
        else:
            for target in tweet['targets']:
                tweet['sender'] = target
                if (tweet['command'] in self.commands):
                    getattr(self, tweet['command'])(tweet)
                else:
                    print '[Helpy] Error - unknown command %s' % tweet['command']

        return

    def parse_status(self, status):
        tokens = status.text.lower().split()
        print tokens 
        parsed = {}
        parsed['target'] = tokens[0]
        parsed['command'] = tokens[1].strip('.,!?')
        parsed['text'] = tokens[2:]
        parsed['raw_text'] = ' '.join(tokens[2:])
        parsed['sender'] = status.user.screen_name
        parsed['targets'] = []
        for x in parsed['text']:
            if "@" in x:
                parsed['targets'].append(x.strip('@.,!?')) 
        return parsed

    def post_tweet(self, response, tweet):
        post = "@" + tweet['sender'] + " " + response
        print tweet['targets']
        api.update_status(post)
        return


    '''
    Functions
    '''

    def insult(self, tweet):
        insults = open('insults.txt').read().split('\n')
        response = ''
        senderLen = len(tweet['sender'])+2 # account for '@' and a space

        while (response == '' or len(response) > 140-senderLen):
            response = insults[random.randint(0,90)]
        
        self.post_tweet(response, tweet)
        return

if __name__ == '__main__':
    # authenticate using variables defined in settings.py
    auth = tweepy.OAuthHandler(twit_key, twit_secret)
    auth.set_access_token(oauth_token, oauth_secret)
    api = tweepy.API(auth)
    
    ''' Just for testing
    pp = pprint.PrettyPrinter(indent=4)
    import inspect
    pp.pprint(inspect.getmembers(api.get_user(7319852)))
    pp.pprint(inspect.getmembers(api.me()))
    print api.rate_limit_status()
    api.update_status("lol")
    '''

    helpi = HelpiBot(api) # create new listener helpy
    stream = Stream(auth, helpi) # authenticate with twitter and attach listener helpy to stream

    #stream.filter( track=( "super bowl", ) )
    #stream.userstream()
    follow_list = ['484471774']
    track_list = None
    stream.filter(follow_list, track_list)
