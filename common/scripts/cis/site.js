$(document).ready(function() {
  
  // Start ad
  adGo();
  
  // Rinse and repeat
  var intervalGo = setInterval(adGo, 15000);
  
  // Transition frames
  function adGo() {
    $('div#frame-2').hide().removeClass('hide');
    $('div#frame-1').delay(6000).fadeOut(500);
    $('div#frame-2').delay(6500).fadeIn(500);
    $('div#frame-2').delay(6000).fadeOut(500);
    $('div#frame-1').delay(7000).fadeIn(500);
  }
  
  $('#wrapper_cis').css('cursor','pointer');
  $('#wrapper_cis').click(function(){
		window.open("/en/catechism/index.html");
  });
});