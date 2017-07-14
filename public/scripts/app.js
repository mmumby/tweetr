$(document).ready(function(){

////////////////////////////////////////////
//// Functions to create/Load/Fetch tweets
////////////////////////////////////////////

//function to add database user information onto page with appropiate CSS properties
  function createTweetElement (tweet) {
    //use moment.js to show time in appropiate format
    let $tweetTime = moment(tweet.created_at).fromNow();
    let $tweet = $('<article class="tweet">');

    let $header = $('<header class="tweet-header">');
    let $headerAv = $('<img class="tweet-logo">').attr('src', tweet.user.avatars.small);
    let $user = $('<h3 class="tweet-user">').text(tweet.user.name);
    let $handle = $('<p class="tweet-handle">').text(tweet.user.handle);

    let $body = $('<main class="tweet-body">');
    let $bodytext = $('<p class="tweet-text">').text(tweet.content.text);

    let $footer = $('<footer class="tweet-footer">');
    let $buttons = $('<span class="tweet-buttons">')
      .append($('<img>').attr('src', '/images/retweetblack.png'))
      .append($('<img>').attr('src', '/images/blackheart.png'))
      .append($('<img>').attr('src', '/images/flagpole.png'));
    let $footerTime = $('<p class="tweet-timestamp">').text($tweetTime);

    //add header/body/footer to tweet
    $tweet.append($header).append($body).append($footer);
    $body.append($bodytext);
    $header.append($headerAv).append($user).append($handle);
    $footer.append($buttons).append($footerTime);

    return $tweet;
  }

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and prepends it to the tweets container
  function renderTweets(tweet) {
    for(singleUser of tweet){
      $('.tweets-container').prepend(createTweetElement(singleUser));
    }

  }

  //function to fetch tweets
  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(tweet){
        renderTweets(tweet);
      }
    });
  }
  loadTweets();

  /////////////////////////////////////////////////////////////
  ///////// jQuery Events
  /////////////////////////////////////////////////////////////

  //click event, highlight text area when clicked
  //Go to top of page when button is clicked
  $('.nav-button').click(function() {
    $('body').animate({scrollTop:0}, 'slow');
      $('.new-tweet').slideToggle("slow", function(){
      $("textarea").focus()
      });
  });

//create class to manipulate css of textarea depending if on focus or blur.
  $('textarea').bind('focus blur', function (){
    $(this).toggleClass('button-focus');
  });

  //Form submission. if empty or > 140 characters give error (Via $.flash plugin)
  // Else, load tweets to the page using AJAX
  $("#twitter-form").on("submit", function(event) {
    event.preventDefault();
    let maxCount = 140;
    let currentValue = maxCount - $('textarea').val().length;
    console.log(maxCount === currentValue);
    if(maxCount === currentValue) {
      $.flash('OOps! Must enter something. Get creative!');
    } else if (currentValue < 0) {
      $.flash('OOps, Tweet is too Long!');
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function() {
          $('.tweets-container').empty();
          $('textarea').val('');
          $('.counter').html('140');
          loadTweets();
        }
      });
    }
  });


});
