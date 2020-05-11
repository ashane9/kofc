var slideshowNavSelector = '.ip-slideshow-nav';

$(document).ready(function(){

  $('#ip-multimedia .ip-slideshow').scrollable({
    loop: true,
    clickable: false,
    size: 1
  });
  
  
  $('#ip-multimedia .ip-slideshow-nav .ip-items').wrapChildren({
    childElem: 'div',
    sets: 5,
    wrapper: 'div class="ip-page"'
  });
  $('#ip-multimedia .ip-slideshow-nav').scrollable({
    next: ".ip-nextPage",
    prev: ".ip-prevPage"
  })

  $('#ip-multimedia .ip-slideshow-nav div.ip-items a').each(function(){
    $(this).click(function(){
      var $d = $(this).closest('div');
      $d.siblings('.active').removeClass('active');
      $d.addClass('active');
      var pos = $('#ip-multimedia .ip-slideshow-nav .ip-page div').index($(this).closest('div'));
      slideshowCurrentItem = pos;
      var scroller = $('#ip-multimedia .ip-slideshow').scrollable();
      scroller.seekTo(pos);
      return false;
    });
  });
});