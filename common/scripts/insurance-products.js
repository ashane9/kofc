$(document).ready(function(){
  
  // Animate arrows on load
  
  // Animate arrows on hover
  $('.arrow').mouseenter(function(){
    $(this).animate({
      top: -15
    }, 200);
  });
  $('.arrow').mouseleave(function(){
    $(this).animate({
      top: 0
    }, 200);
  });
  
});