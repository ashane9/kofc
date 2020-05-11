$(document).ready(function(){
  
  // Animate elements
  $('#contact .man-01').animate({
    bottom: 0,
    opacity: 1
  }, 1400);
  
  $('#contact .man-02').animate({
    bottom: 0,
    opacity: 1
  }, 1400);
  
  $('#contact .logo-koc').delay(1000).animate({
    left: 0,
    opacity: 1
  }, 1400);
  
  $('#contact .title').delay(1600).fadeIn(1400);
  
  $('#contact .title').hover(function(){$(this).css({'cursor':'pointer'})});
  
  $('#contact .title').click(function(){
	window.location = '/en/membership/join/join.html';						  
  });
  
});