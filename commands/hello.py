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

matches = "(hi|hello)"

def response(helpybot, tweet):
  target = "@" + tweet['sender']
  response = 'Well hi there ' + target + '!'
  helpybot.post_tweet(response, tweet)
  return
