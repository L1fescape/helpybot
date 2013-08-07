# Description:
#   Scour the internet far and wide for images
#   of pugs.
#
# Dependencies:
#   requests
#
# Configuration:
#   None
#
# Commands:
#   pug me
#
from random import randint
import requests
import json

matches = "pug"

def response(helpybot, tweet):
  target = "@" + tweet['sender']

  # google image search base url
  base_url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=%s&start=%s'
  # the best search term ever
  query = 'pug'
  # google paginates their results, so let's pick a random result page to pull a pug from
  start = randint(0, 100)
  # sub in our query and pagination start and make the request 
  r = requests.get(BASE_URL % (query, start))
  # grab the actual search results out of the response
  pug_results = json.loads(r.text)['responseData']['results']
  # google returns 4 results per page. pick a random result and grab the image url from it
  response = target + " " + pug_results[randint(0,3)]['url']

  helpybot.post_tweet(response, tweet)
  return
