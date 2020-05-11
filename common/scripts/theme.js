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
  
  if(urlStr.match('knightsinaction') || urlStr.match('/columbia/detail/') || urlStr.match('/printer_friendly/')){
	$('#langLinks').css({'display':'none'});
  }
		
  $('.slideshow-header').cycle();
  
  //$('#slideshow-cm').cycle();

  //footer fix
  $("#footer").css("background","url('../graphics/footer.png') bottom no-repeat");
    
  // clear form inputs
  $("form#search-form input[type='text']").toggleVal();
  $("form#emailobj input[type='text']").toggleVal();
  
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
	
	//$("table td").css("padding","5px");
	
	// Simple Accordion for Homepage Info     
      $(".accordionFourth h4").css('cursor', 'pointer');
      $(".accordionFourth h4").click(function(){
        $(this).siblings("h4").next("div").slideUp(300);
        if ($(this).hasClass("selected")) {
          $(this).removeClass('selected');
          $(this).next("div").slideUp(300);
        }
        else {
          $(this).addClass("selected");
          $(this).addClass('selected').siblings(".selected").removeClass("selected");
          $(this).next("div").slideDown(300);
        }
      });
	  
	$(".youngAdultInsurance").find("div.pane:gt(0)").hide().end().find("h2").click(function(){$(this).toggleClass("current1").siblings().removeClass("current1").end().next("div.pane").slideToggle().siblings("div.pane:visible").slideUp();return false});
	
	$(".youngAdultInsurance .pane").css('display', 'none');
	
	$(".accordion").find("div.pane:gt(0)").hide().end().find("h2").click(function() {
    $(this).toggleClass("current").siblings().removeClass("current").end().next("div.pane").slideToggle().siblings("div.pane:visible").slideUp();
    return false
  	})
});

//for insurance products
function change_parent_url(url)
{
	document.location=url;
}

function func(e, c, a, l)
{
	if(e.button == 2)
	{
		_gaq.push(['_trackEvent', c, a, l]);
	} else if(e.button == 1)
	{
		document.location.href = $(this).attr('href');
	}
}