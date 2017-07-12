// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
 $(document).ready(function(){
function renderTweets(tweet) {
  for(singleUser of tweet){
    $('.tweets-container').prepend(createTweetElement(singleUser));
}
}


function createTweetElement (tweet) {

var $tweet = $('<article class="tweet">');

var $header = $('<header class="tweet-header">');
var $headerAv = $('<img class="tweet-logo">').attr('src', tweet.user.avatars.small);
var $user = $('<h3 class="tweet-user">').text(tweet.user.name);
var $handle = $('<p class="tweet-handle">').text(tweet.user.handle);

var $body = $('<main class="tweet-body">');
var $bodytext = $('<p class="tweet-text">').text(tweet.content.text);

var $footer = $('<footer class="tweet-footer">');
 var $buttons = $('<span class="tweet-buttons">')
 .append($('<img>').attr('src', '/images/retweetblack.png'))
 .append($('<img>').attr('src', '/images/blackheart.png'))
 .append($('<img>').attr('src', '/images/flagpole.png'));
var $footerTime = $('<p class="tweet-timestamp">').text(tweet.created_at);

 $tweet.append($header).append($body).append($footer);
 $body.append($bodytext);
 $header.append($headerAv).append($user).append($handle);
 $footer.append($buttons).append($footerTime);


   return $tweet;

};
renderTweets(data)
});




