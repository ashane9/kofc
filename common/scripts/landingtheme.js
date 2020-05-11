$(document).ready(function(){
  
  var urlStr = document.location.href;
  var lang;
  
  if(urlStr.match('/es/')){
	  lang = 'es';  
  } else if(urlStr.match('/fr/')){
	  lang = 'fr';
  } else if(urlStr.match('/pl/')){
	  lang = 'pl';
  } else if(urlStr.match('/en/')){
	  lang = 'en';
  }
		
  $('.slideshow-header').cycle();
  
  $('#slideshow-cm').cycle();
  
  //footer fix
  $("#footer").css("background","url('../graphics/footer.png') bottom no-repeat");
    
  // clear form inputs
  $("form#search-form input[type='text']").toggleVal();
  
  //hovers for subnav
  $("#primary-links li .subnav").css({display: "none"}); // Opera Fix
  $("#primary-links > li").hover(function(){
       $(this).addClass('active');
       $(this).find('.subnav').fadeIn(300);
  },function(){
       $(this).removeClass('active');
       $(this).find('.subnav').css({display: "none"});    
  });

  $('.subnav').bgiframe();

  //have jquery compensate for no first/last child in IE and pngs
  $('ul#primary-links li:last-child').addClass('last');
  $('ul#primary-links li:first-child').addClass('first');
  $('.top-nav li:first-child').addClass('first');
  $('.top-nav li:last-child').addClass('last');
  $('ul#primary-links li:last-child').addClass('last');
  
 //Add border to images if in jpg format and no border="0" attribute is set
	for(var i=0;i<$("img").length;i++){
		imgAttr = document.images.item(i).src;
		var regExp = "/^" + imgAttr + "/g";
		currImg = document.images.item(i);
		if(regExp.match('jpg') && currImg.border != "0"){
			currImg.style.border = "1px solid #000";
		}
	}  
    // Program Area Tabs
  $(".tabs").tabs("div.panes > div", {tabs: 'ul.navigation li'}); 
      $(".tabs div.panes").append("<span class=\"bottom\"></span>");

});