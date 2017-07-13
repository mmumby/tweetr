
/////////////////////////////////////////////
////////////////////////////////////////////
//// document ready function
///////////////////////////////////////////
//////////////////////////////////////////


// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
 $(document).ready(function(){
function renderTweets(tweet) {
  for(singleUser of tweet){
    $('.tweets-container').prepend(createTweetElement(singleUser));
}
}

//toggle form when button is clicked.
// function buttonClick () {
//   $('button').click(function() {
//   $('.new-tweet').slideToggle( "slow", function()){
//     $("textarea").focus();
//   };
// });
// }
//function to add database tweets onto page with appropiate CSS properties
function createTweetElement (tweet) {
var $tweetTime = moment(tweet.created_at).fromNow();
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
var $footerTime = $('<p class="tweet-timestamp">').text($tweetTime);

//add header/body/footer to tweet
 $tweet.append($header).append($body).append($footer);
 $body.append($bodytext);
 $header.append($headerAv).append($user).append($handle);
 $footer.append($buttons).append($footerTime);

   return $tweet;

};
// renderTweets(data);

//form submission using jQuery and Ajax
  $("#twitter-form").on("submit", function(event) {
    event.preventDefault();
  var maxCount = 140;
  var currentValue = maxCount - $('textarea').val().length;
console.log(maxCount === currentValue);
  if(maxCount === currentValue) {
    alert("you need input!");
  } else if (currentValue < 0) {
    alert("Too long");
  } else {
    $.ajax({
      type: 'POST',
      url:  '/tweets',
      data: $(this).serialize(),
      success: function() {
         $('.tweets-container').empty();
        $('textarea').val('');
        loadTweets().faceIn();
      }
    });

  }
});


//function to fetch tweets

function loadTweets() {
  $.ajax({
    type: 'GET',
    url: '/tweets',
    // data: $(this),
    success: function(tweet){
    renderTweets(tweet)
  }
});
  }
loadTweets();


});









