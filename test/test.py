# packages
import os, sys
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0,parentdir) 
from helpybot import HelpyBot

class Tweet(dict):
  pass

if __name__ == '__main__':
    helpy = HelpyBot({})

    tweet = Tweet()
    tweet.text = '@helpybot hello there!'
    tweet.user = Tweet()
    tweet.user.screen_name = 'blah'

    helpy.on_status(tweet)
