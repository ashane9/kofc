var storyId = 1;
var storyCount = 0;
var storyCycleInterval = 10000;
var storyCycleIntervalId;

/*
	Video tab code, cloned by Shah Khatri from the "left_sidebar_tabs" code on 8/30/08
*/
$(document).ready(function(){
  $('.video_tabs_nav').addClass('video_tabs_nav_js');
  $('.video_tab_content > div').hide();
  $('.video_tab_content > div:first').show();
  $('.video_tabs_nav > li:first a').addClass('active');
  $('.video_tabs_nav > li a').click(function(){
    $('.video_tabs_nav > li a.active').removeClass('active');
    $(this).addClass('active');
    $('.video_tab_content > div:visible').slideUp(300, showVideoTabContent);
    return false;
  });
});

$(document).ready(function(){
  $('.tabs_nav').addClass('tabs_nav_js');
  $('.left_sidebar_tabs h3').hide();
  $('.tab_content > div').hide();
  $('.tab_content > div:first').show();
  $('.tabs_nav > li:first a').addClass('active');
  $('.tabs_nav > li a').click(function(){
    $('.tabs_nav > li a.active').removeClass('active');
    $(this).addClass('active');
    $('.tab_content > div:visible').slideUp(300, showTabContent);
    return false;
  });
});

$(document).ready(function(){
  storyCount = $('.news_update .story').length;
  $('.news_nav').insertAfter('.news_update .story:last');
  $('.news_nav').addClass('news_nav_js');
  $('.news_update').addClass('news_update_js');
  $('.news_update .story').hide();
  $('.news_update .story:first').show();
  $('.news_nav > li:first a').addClass('active');
  $('.news_nav > li a').click(function(){
    $('.news_nav > li a.active').removeClass('active');
    $(this).addClass('active');
    $('.news_update .story:visible').fadeOut(50, showNewsContent);
    clearInterval(storyCycleIntervalId);
    return false;
  });
  //storyCycleIntervalId = setInterval("cycleNews()", storyCycleInterval);
});

function cycleNews() {
  if (++storyId > storyCount) {
    storyId = 1;
  }
  $('.news_nav > li a.active').removeClass('active');
  $('.news_nav > li a[href=#story'+storyId+']').addClass('active');
  $('.news_update .story:visible').fadeOut(300, showNewsContent);
}

/*
	Video tab code, cloned by Shah Khatri from the "left_sidebar_tabs" code on 8/30/08
*/
function showVideoTabContent() {
  $($('.video_tabs_nav > li a.active').attr('href')).slideDown(300);
}

function showTabContent() {
  $($('.tabs_nav > li a.active').attr('href')).slideDown(300);
}

function showNewsContent() {
  $($('.news_nav > li a.active').attr('href')).fadeIn(50);
}