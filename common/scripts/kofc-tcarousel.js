// JavaScript Document

function advanceSlideshow() {
  slideshowCurrentItem++;
  if (slideshowCurrentItem >= slideshowNumItems) {
    slideshowCurrentItem = 0
  }
  var a = $("#multimedia " + slideshowNavSelector).scrollable();
  a.click(slideshowCurrentItem);
  $("#multimedia " + slideshowNavSelector + " div.items>div:eq(" + slideshowCurrentItem + ") a:first").click()
}

var slideshowNavSelector = ".slideshow-nav";
$("#multimedia .picture a").addClass("notactive");
var slideshowAutoAdvanceDelay = 7e3;
var slideshowAutoAdvance;
var slideshowNumItems;
var slideshowCurrentItem;
var stopForever = false;
var htmlContent;
var so;
var divElement;
var currLang;

$(document).ready(function() {
  var a = ".jpg";
  var b = ".gif";
  var c = ".png";
  var d;
  var e;
  //$(".slideshow-header").cycle();
  $("#multimedia .slideshow").scrollable({
    loop: true,
    clickable: false,
    size: 1
  });
  $("#multimedia .slideshow-nav").scrollable({
    loop: true,
    clickable: false,
    size: 4
  });
  
  <!--if($("multimedia .slideshow-nav").size = 4){-->
	  //hide left and right nav buttons if the there is only 4 items
	  <!--$('a.prevPage').css({'display':'none'});$('a.nextPage').css({'display':'none'});}-->

  
  $("#multimedia .slideshow-nav div.items a").each(function() {
    $(this).click(function() {
      var a = $(this).closest("div");
      a.siblings(".active").removeClass("active");
      a.addClass("active");
      var b = $("#multimedia .slideshow-nav div.items div").index($(this).closest("div"));
      slideshowCurrentItem = b;
      var c = $("#multimedia .slideshow").scrollable();
      c.seekTo(b);
      return false
    })
  });
  
  $('#multimedia .slideshow-nav .items div').each(function() {
	 $(this).removeClass('active');
  });
  $('#multimedia .slideshow-nav .items div:first').attr('class','active');
  
  slideshowNumItems = $("#multimedia " + slideshowNavSelector + " div.items>div").length;
  slideshowCurrentItem = 0;
  slideshowAutoAdvance = setInterval(advanceSlideshow, slideshowAutoAdvanceDelay);
  $("#multimedia").click(function() {
    clearInterval(slideshowAutoAdvance);
    stopForever = true
  });
  $("#multimedia").hover(function() {
    clearInterval(slideshowAutoAdvance)
  }, function() {
    if (!stopForever) {
      slideshowAutoAdvance = setInterval(advanceSlideshow, slideshowAutoAdvanceDelay)
    }
  });
  $("#multimedia .picture a").removeClass("notactive");
  $("#multimedia .picture a").addClass("isactive");
  
  
  $("#footer").css("background","url('http://www.kofc.org/common/graphics/footer.png') bottom no-repeat");
  
  
  //
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
		
  //$('.slideshow-header').cycle();
  
  //$('#slideshow-cm').cycle();

  // clear form inputs
  $("form#search-form input[type='text']").toggleVal();
  $("form#emailobj input[type='text']").toggleVal();
    
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
	 
	 //for embedded video
	 if($('div#int_vp').length != 0)
	 {
	 	var vidURL = $('#int_vp').attr('fname');
		var so=new SWFObject("/common/swf/video_640360.swf","vidplayer","640","360","9","#000");
		so.addVariable("id",vidURL);
		so.addVariable("l",lang);
		so.write("int_vp");
	 }
	 
	 
	 //Stying for Giving page (/en/charities/annualappeal.html)
	 var currPage = document.location.href;
	 
	 //alert(currPage)
	 
	 if(currPage.match('annualappeal') || currPage.match('checkdonate') || currPage.match('unitedcharity'))
	 {
		 //alert('This is the "Annual Appeal\'s" page!');
		 $('#sidebar-right').css({'padding':'10px 10px 0px 0px','width':'280px','position':'relative','left':'10px'});
		 $('#main-content').css({'padding':'8px 8px 10px 0px'});
		 $('#container-inner').css({'background':'#f6f6f6'});
		 $('#content').css({'background':'none'});
		 $('#footer').css({'background':'url(/common/graphics/aa-footer.png) no-repeat'});
		 $('#footer #wrapper').css({'padding-top':'30px'});
		 //$('#asa-graphic').html('<img src="/common/graphics/ax-sword-anchor-195x320.png" />');
	 }
	 
	 $('form#aa-search-form input[type="text"]').toggleVal();
	 $('form#aa-emailobj input[type="text"]').toggleVal();
 
	 $('form#aa-donate input[type="text"]').change(
		function(){
			//var regex = /[0-9]/;
			var val=this.value;
			if(!/^[0-9\.]+$/.test(val))
			{
				alert('Please include a valid amount');
				this.value = '';
			} else {
				var dollarAmt = this.value.split('.')[0];
				var changeAmt = this.value.split('.')[1];
				//alert(changeAmt);
				if(changeAmt == '00' || changeAmt == undefined || changeAmt == '')
				{
					this.value = dollarAmt + '.00';
				} else {
					this.value = dollarAmt + '.' + changeAmt;
				}
			}
		}
	 );
	 
	 $('form#aa-donate img').each(function(){
	 	if($(this).attr('name') == 'usBtn')
		{
			$(this).click(function(){
				sendToGivingApp('US');
			});
				
		} else if($(this).attr('name') == 'caBtn'){
			$(this).click(function(){
				sendToGivingApp('CA');
			});
		}
	 }).css({'cursor':'pointer'});
	 
})