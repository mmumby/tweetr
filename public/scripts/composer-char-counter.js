
//function to count text input
// counter turns red when text input goes over 140

$(document).ready(function(){
  var maxCount = 140;
  $('textarea').on('keydown', function(){
    var currentValue = (maxCount - this.value.length);
    var countDown = this.value.length;

    if (countDown >= maxCount) {
      $(this).parent().children('.counter').addClass('counter-negative');
      $(this).parent().children('.counter').text(currentValue);
    } else if (countDown < maxCount) {
      $(this).parent().children('.counter').removeClass('counter-negative');
      $(this).parent().children('.counter').text(currentValue);
    }
  });
});
