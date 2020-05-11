// JavaScript Document

$(document).ready(function(){
	
	$('div#audioPlayer').css({'display':'none'});
	$('div#audioplayer_1').css({'display':'none'});
	
	var ua = navigator.userAgent;
	var checker = {
		iphone: ua.match(/(iPhone|iPod|iPad)/),
		android: ua.match(/(Android)/)	
	}
	var fName = $('div#audioPlayer').attr('fileName');
	
	//alert(fName);
	
	if(checker.iphone || checker.android)
	{
		$('div#audioPlayer').css({'display':'block'});
		$('div#audioPlayer').html('<audio controls="controls" autoplay="autoplay"><source src="' + fName + '"></audio>');
	} else {
		$('div#audioplayer_1').css({'display':'block'});	
	}
	
});