$(document).ready(function(){
  // This Month's Book
  $(".book-tabs > ul").tabs(".book-tabs .content > div");
  
  //  Past Discussions Tabs, Scrollable, and Tooltip
  $("#past-discussions .tabs-nav").tabs("#past-discussions .tabs-content > div");
  $("#past-discussions .scrollable").scrollable({
    size: 1
  });
  $('#past-discussions .scrollable li').each(function() {
    $(this).qtip({
      content: $(this).children('.tooltip'),
      position: { 
        target: 'mouse', 
        adjust: { 
          x: 20, y: 20
        },
        corner: {
           target: 'topRight',
           tooltip: 'bottomLeft'
        }
      }
    });
  });
  
  var url = String(document.location.href);
  
    $('#past-discussions .tabs-nav li').click(function() {
													   
		if(url.match("/en/") && $(this).text().match('Evangelization'))
		{
			$(".buybooklet").html("<a href='https://www.kofc.org/purchaseapp/' target='_blank'>Order New Evangelization Booklets</a>");
      //alert($(this).text());
		} else if(url.match("/en/") && $(this).text().match('Hart'))
		{
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_hart' target='_blank'>Order Hart Series Booklets</a>");
		} else if(url.match("/en/") && $(this).text().match('Veritas')){
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_veritas' target='_blank'>Order Veritas Series Booklets</a>");
		} else if(url.match("/en/") && $(this).text().match('Devotional')){
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_Devotional' target='_blank'>Order Devotional Items</a>");
		} else if(url.match("/es/") && $(this).text().match('Hart'))
		{
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_hart_Sp' target='_blank'>La serie Luke E. Hart - Para pedir en l&#237;nea</a>");
		} else if(url.match("/es/") && $(this).text().match('Veritas'))
		{
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_veritas_s' target='_blank'>La serie Veritas en linea - Para pedir en l&#237;nea</a>");
		} else if(url.match("/fr/") && $(this).text().match('Hart'))
		{
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_hart_FR' target='_blank'>Bon de commande: Collection Luke E. Hart</a>");
		} else if(url.match("/fr/") && $(this).text().match('Veritas'))
		{
			$(".buybooklet").html("<a href='http://alphadata.ws/cis_veritas_FR' target='_blank'>Bon de commande: Collection Veritas</a>");
		} else if(url.match("/fr/") && !$(this).text().match('Veritas') || !$(this).text().match('Hart')){
			$(".buybooklet").html("<a href='javascript:void(0);'>&#160;</a>");	
		} else if(url.match("/es/") && !$(this).text().match('Veritas') || !$(this).text().match('Hart')){
			$(".buybooklet").html("<a href='javascript:void(0);'>&#160;</a>");
		}
		
  });
  
  $('#past-discussions .scrollable li').each(function() {
	
	$(this).children('a.inactive').css({'visibility':'hidden'});
	
  });
  
  $('#past-discussions .scrollable .items li a.download').hover(function(){$('#sidebar-right').fadeOut(100)},function(){$('#sidebar-right').fadeIn(100)});
  
  $('a').click(function(e){
		var url=$(this).attr('href');
		var linkType = $(this).text();
		//alert(label);
		//alert('url is: ' + url + '\nType is: ' + linkType);
		if(linkType == 'Listen'){
			var label = url.split('.')[0].replace('audio/','');
			//alert('Listen: ' + label);
			_gaq.push(['_trackEvent','CIS Audio','Play',label]);
		} else if(linkType == 'mp3'){
			var label = url.split('aod/')[1];
			//alert('mp3: ' + label)
			_gaq.push(['_trackEvent','CIS MP3 Download','Click',label]);
		} else if(linkType == 'Download PDF'){
			var label = url.split('.')[0].replace('/en/resources/cis/','');
			//alert('Download PDF: ' + label);
			_gaq.push(['_trackEvent','CIS Download PDF','Click',label]);
		}
  });
});