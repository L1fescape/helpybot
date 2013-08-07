# Description:
#   Say hello back
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hi
#   hello
from random import choice

matches = "(hi|hello)"

def response(helpybot, tweet):
  target = "@" + tweet['sender']

  responses = [
    'Well hi there %s!' % target,
    'Howdy!',
    'What\'s up %s?' % target,
    'Hola %s' % target,
    '%s, what\'s good?' % target
  ]

  response = choice(responses)

  helpybot.post_tweet(response, tweet)
  return
