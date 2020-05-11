var slideshowAutoAdvanceDelay = 6000;

var slideshowAutoAdvance;
var slideshowNumItems;
var slideshowNumPages;
var slideshowNumItemsPerPage;
var slideshowCurrentItem;
var stopForever = false;

$(document).ready(function(){
  slideshowNumPages = $('#ip-multimedia ' + slideshowNavSelector).data('scrollable').getSize();
  slideshowNumItems = $('#ip-multimedia ' + slideshowNavSelector + ' div.ip-page>div').length;
  slideshowNumItemsPerPage = $('#ip-multimedia ' + slideshowNavSelector + ' div.ip-page:first>div').length;
  slideshowCurrentItem = 0;
  slideshowAutoAdvance = setInterval(advanceSlideshow, slideshowAutoAdvanceDelay);
  
  $('#ip-multimedia').click(function(){
    clearInterval(slideshowAutoAdvance);
    stopForever = true;
  });
  
  $('#ip-multimedia').hover(
    function(){
      clearInterval(slideshowAutoAdvance);
    },
    function(){
      if (!stopForever)
      {
        slideshowAutoAdvance = setInterval(advanceSlideshow, slideshowAutoAdvanceDelay);
      }
    }
  );
});

function advanceSlideshow()
{
  slideshowCurrentItem++;
  if (slideshowCurrentItem >= slideshowNumItems)
  {
    $('#ip-multimedia ' + slideshowNavSelector).data('scrollable').begin();
    slideshowCurrentItem = 0;
  }
  if (slideshowCurrentItem > 0 && slideshowCurrentItem % slideshowNumItemsPerPage == 0)
  {
    $('#ip-multimedia ' + slideshowNavSelector + ' .active').removeClass('active');
    $('#ip-multimedia ' + slideshowNavSelector).data('scrollable').next();
  }
  $('#ip-multimedia ' + slideshowNavSelector + ' div.ip-items>div>div:eq(' + slideshowCurrentItem + ') a:first').click();
}