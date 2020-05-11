// =============================================//
// TABLE OF CONTENTS                            //
// =============================================//
// 1. Global vars / document.ready              //
// 2. jQuery Plugin                             //
// 3. Brightcove API                            //
// 4. Page Stucture Tools                       //
// 5. Rendering Tools                           //
// 6. Video Tools                               //
// =============================================//



var brightcove_token = 'keO46vGXy46nAgdEYmPmycuEhuK4qofugD5OVLmAoizsCBo-4WeU3w..';
var downloadServer = 'http://slideshows.kofc.org/video/index.php?id=';

var categories_for_ie7 = {};


Array.prototype.unique = // Grab unique values from an array
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

$(document).ready(function() {
  $('#categories ul.navigator li a').live('click', loadNavigatorTabContent); // Load clicked tab's playlists/videos if it hasn't already been loaded.
  $('div.video a').live('click', updateActiveVideo); // Update video up top when a thumbnail is clicked
  $('div#include-section a').live('click', updateActiveVideo);

  // Make URL hash accessible on the HTML body
  hash = window.location.hash;
  if (hash) {
    hash = hash.substr(1);
    $('body').data('hash', hash);
  }
  
  // Load all playlist and video ids
  getPlaylistData();
  
  // Setup jQuery Tools Scrollable
  var api = $('.scrollable').scrollable().data('scrollable');
  var size = 7; // Set to the number of visible scrollable items
  api.onBeforeSeek(function(event, index) {
    if (this.getIndex() >= this.getSize() - size) { // Disable next button if we're at the end of scrollable
      $('a.next').addClass('disabled');
      if (index > this.getIndex()) {
        event.preventDefault();
      }
    } else {
      $('a.next').removeClass('disabled');
    }
  });
});

// =============================================//
// JQUERY PLUGIN
// jQuery extension for Brightcove
// =============================================//
(function( $ ){
  var categories = [];
  
  var methods = {
    init: function(options) {
      var videoLibrary = $(this);
      $.ajax({
        url: options.url,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          $.each(response.categories, function (index, category) { // Save all categories individually
            var key = toDomID(category.title);
            $(videoLibrary).data('category-' + key, category);
            categories_for_ie7[key] = category;
          });

          $(videoLibrary).data('categories', response.categories); // Save all categories together for easy access

          buildNavigator(response.categories, options.navigator);
          $("ul.main.tabs").tabs("section.main.panes > div", {tabs: 'a.main'});
          $("ul.nested.tabs").tabs(" > div", {tabs: ' > a.nested'});
          
          if (hash) {    
            
            getVideoByID(hash);  
            var playlistRefId = getPlaylistRefIdForHash(hash);
            
            var cat = getCategoryForPlaylistRefId(playlistRefId);
            var selectedCategory;
            $.each(response.categories, function(i,e) {
              if (e.title == cat.title) {
                getPlaylists(e.playlists); // Only get the first playlist
              };
            });
            $('#loading-player').hide();
            $('.gallery-video').show();
          } else {
            getPlaylists(response.categories[0].playlists); // Only get the first playlist
          };
        }
      });
    }
  }

  $.fn.brightcoveLibrary = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.brightcoveLibrary' );
    }
  };

  $.fn.scrollToThis = function(speed) {
    var position = $(this).offset().top
    if (speed == null) {
      var speed = 800
    };
    $('html, body').animate(
      {scrollTop: position}, speed
    );
  };

})( jQuery );


// =============================================//
// BRIGHTCOVE API
// Brightcove API magic
// =============================================//
function toDomID(string) {
  return string.toLowerCase().replace(/\W/g, '_');
}

function addScriptTag(id, url, callback) { // Adding video playlist to the page
  var scriptTag = document.createElement("script");
  var noCacheIE = '&noCacheIE=' + (new Date()).getTime();

  // Add script object attributes
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.setAttribute("charset", "utf-8");
  scriptTag.setAttribute("src", url + "&callback=" + callback + noCacheIE);
  scriptTag.setAttribute("id", id);

  // Appending script to head
  var head = document.getElementsByTagName("head").item(0);
  head.appendChild(scriptTag);
}

function getPlaylistData() {
  addScriptTag("Playlists", "http://api.brightcove.com/services/library?command=find_all_playlists&playlist_fields=id,referenceId,name,videoIds&token=" + brightcove_token, "onPlaylistsReceived");  
}

function getPlaylistRefIdForHash(hash) {
  var playlistRefId;
  hash = parseInt(hash);
  var data  =   $('#video-library').data('playlistData');
  $.each(data, function(i,playlist) {
    if ($.inArray(hash, playlist.videoIds) != -1 ) {
      playlistRefId = playlist.referenceId;
    }
  });
  return playlistRefId;
}

function getCategoryForPlaylistRefId(referenceId) {
  var categories  =   $('#video-library').data('categories');
  var categoryForPlaylist;
  $.each(categories, function(i,category) {
    if ($.inArray(referenceId, category.playlists) != -1 ) {
      categoryForPlaylist = category;
    }
  });
  return categoryForPlaylist;
}

function getPlaylists(playlists) {
  addScriptTag("Playlists", "http://api.brightcove.com/services/library?command=find_playlists_by_reference_ids&reference_ids=" + playlists.join(',') + "&video_fields=id,name,shortDescription,longDescription,creationDate,publishedDate,lastModifiedDate,linkURL,linkText,tags,videoStillURL,thumbnailURL,referenceId,length,economics,playsTotal,playsTrailingWeek&media_delivery=http&token=" + brightcove_token, "insertPlaylistVideoThumbs");
}

function getPlaylistsByCat(catID) {
/*  alert(catID);
  catID = "insurance";
  alert(catID);*/
  var categoryString = catID.split('#');
  
  catID = categoryString[categoryString.length-1];

   var category = $('body').data('category-' + catID);
//  var category = categories_for_ie7[catID];
  var catIndex = $('#categories ul.navigator li.' + catID).index();
  getPlaylists(category.playlists);
  $('#categories ul.navigator li.' + catID).addClass('category-loaded');
  $('#cat-' + catIndex).fadeIn(400, function() {
    //$('.category-loading-screen').hide();
  });
}

// function getPlaylistVideos(playlist) {
//   addScriptTag(playlist + "Videos", "http://api.brightcove.com/services/library?command=find_playlist_by_reference_id&reference_id=" + playlist + "&media_delivery=http&token=" + brightcove_token, "insertPlaylistVideoThumbs");
// } 

function getPlaylistReferenceIds(categories) {
  var referenceIds = [];
  $.each(categories, function(index, category) {
    referenceIds = referenceIds.concat(category.playlists);
  });

  return referenceIds.unique();
}

function getVideoByID(hash) {
  $.getJSON('http://api.brightcove.com/services/library?command=find_videos_by_ids&video_ids=' + hash + '&video_fields=name&token=' + brightcove_token + '&callback=?',
    function(data) {
      if (data.error) {
        getPlaylists($('#video-library').data('categories')[0].playlists); // Only get the first playlist
        $('.video-meta').hide();
        $('#loading-error').show();
      } if (data.items[0] == null) {
        getPlaylists($('#video-library').data('categories')[0].playlists); // Only get the first playlist
        $('.video-meta').hide();
        $('#loading-error').show();
        // $('#video-inner').append(error_screen);
      } 
      else {
        var video_title = data['items']['0']['name'];
        var video_id = hash;
        updateVideoMeta(video_title, video_id);
        addVideo(hash);        
      };
      
    }
  );
}

// =============================================//
// PAGE STRUCTURE
// Tools for building/altering the page content
// =============================================//
function initializeDisplay() {
  $('.loading-screen').hide();

  $(".gallery-video, #categories-wrapper").fadeIn(400, function () {
    if ( $('body').data('hash') ) {
      if ($('#panes .video a[rel="' + $('body').data('hash') + '"]:first').length > 0) { // if the hashed-in video exists on the page, virtually click it
        firstVideoLink = $('#panes .video a[rel="' + $('body').data('hash') + '"]:first');
        var categoryTab  = firstVideoLink.parents('.tab-content');
        var categoryTabId = categoryTab.data('index');

        var playlistTab  = firstVideoLink.parents('.playlist-tab');
        var playlistTabId = playlistTab.data('index');

        var categoryTabs = categoryTab.find("ul.nested.tabs").data("tabs");
        categoryTabs.click(playlistTabId);

        var mainTabs = $("ul.main.tabs").data("tabs");
        mainTabs.click(categoryTabId);
        firstVideoLink.trigger('click');
      } else {
        getVideoByID(hash); // load the video directly from brighcove if it doesn't exist in any of the playlists
      }
    } else {
      firstVideoLink  = $('#panes .tab-content:first .video a:first');
      firstVideoLink.trigger('click');
    }

    $('body').data('firstVideoLoaded', true); // Flag that the first video has loaded
  });
}

function buildNavigator(categories, selector) {
  $.each(categories, function(index, category) {
    var category_item = $('<li class="' + toDomID(category.title) + '"><a class="main" href="#' + toDomID(category.title) +'">' + category.title +'</a></li>')
    $(selector).append(category_item);
    renderCategoryTab(index, category);
  });
  $(selector).append('<li>&nbsp;</li>');
}

function loadNavigatorTabContent() {
  var catID = $(this).attr('href').substring(1);
  var catIndex = $(this).parent().index();
  if (!$(this).parent().hasClass('category-loaded')) {
    $('.category-loading-screen').show();
    $('#cat-' + catIndex).hide();
    getPlaylistsByCat(catID);
  }
  return false;
}

function onPlaylistsReceived(jsonData) {
  $('#video-library').data('playlistData', jsonData.items);
  $("#video-library").brightcoveLibrary({url: 'data.js', navigator: 'ul.navigator'});
}


function insertPlaylistVideoThumbs(jsonData) {
  var firstVideoLink = '';
  var playlists = jsonData.items;

  $.each(playlists, function(index, playlist) {
    var selector = ".playlist-tab." + playlist.referenceId;
    $(selector).addClass('playlist-loaded').html(renderPlaylistGridRows(playlist));
    var playlistLinks = $('a[rel="#' + playlist.referenceId +'"]');
    playlistLinks.text(playlist.name);
  });

  if (!$('body').data('firstVideoLoaded')) { // Only initialize the display if the first video has not yet loaded.
    initializeDisplay();
  }
  $('.category-loading-screen').hide();
}

function updateActiveVideo(hash) {
  var current_video = $('#video #video-inner object')
  var new_video = $(this)

  // Get new video's meta
  video_title = $(this).attr('title');
  video_id = $(this).attr('rel');
  video_download = $(this).attr('download');
  video_wmv = $(this).attr('wmv');

  // Highlight current video in bottom section
  $('.current-video').removeClass('current-video');
  new_video.addClass('current-video');

  // Remove old video / add new video
  removeVideo(current_video.attr('id'));
  updateVideoMeta(video_title, video_id, video_download, video_wmv);
  addVideo(video_id);

  $('.video-meta').show();
  $('#top').scrollToThis();
  return false;
}

function updateActiveNavigatorTab(jsonData) {

  hash = window.location.hash;
  hash = hash.substr(1);
  var playlist = jsonData.referenceId;

  if (hash == data.id) {
    $('li.' + playlist).siblings().removeClass('active');
    $('li.' + playlist).addClass('active');
    $('.tabs').select(data.id);
  }
}

// =============================================//
// RENDERING TOOLS
// Tools for rendering structure (i.e. - Handlebars replacement, parsing JSON data)
// =============================================//
function renderVideoThumbnail(videoData){
  var video_wmv = videoData.linkURL != null ? ' wmv="' + videoData.linkURL + '"' : '';
  var video_thumb = '<div class="video grid_6 alpha">';
  video_thumb += '<a href="' + videoData.id + '" title="' + videoData.name + '" download="' + downloadServer+videoData.id + '"' + video_wmv + ' rel="'+ videoData.id +'" onclick="sData(this.title);"><img src="' + videoData.videoStillURL + '" alt="' + videoData.name + '" class="thin-border" height="194" width="320" /></a>';
  video_thumb += '<h3><a href="' + videoData.id + '" rel="'+ videoData.id +'" title="' + videoData.name + '" download="' + downloadServer+videoData.id + '"' + video_wmv + '  onclick="sData(this.title);">' + videoData.name + '</a></h3>';
  video_thumb += '<p>' + videoData.shortDescription + '</p>';
  video_thumb += '</div>';

  return video_thumb;
}

function renderPlaylistGridRows(playlistData) {
  var playlistHTML = '';
  var i=0;
  $.each(playlistData.videos, function (index, video) {
    if (i%2 == 0) {
     playlistHTML += '<div class="row">';
    }
    playlistHTML += renderVideoThumbnail(video);
    if (i%2 == 1) {
      playlistHTML += '</div>';
    }
    i++;
  });
  if (i%2 == 1) {
    playlistHTML += '</div>';
  }
  return playlistHTML;
}

function renderCategoryTab(index, category) {
  var category_div = $('<div class="tab-content" ></div>');
  var category_domID = 'cat-' + index;
  if (index == 0) {
    category_div.addClass('active')
  }
  category_div.attr('id', category_domID);
  category_div.data('index', index);

  var playlists_ul = $("<ul id=\"" + category_domID + "-tabs\" class=\"tabs nested sub-nav grid_4 alpha\"></ul>");
  category_div.append(playlists_ul);

  $.each(category.playlists, function(i, playlist) {
    var playlist_id = toDomID(playlist);

    var playlist_li = $('<li data-playlist-id="' + playlist +'" id="' + playlist + '" class="nested"><a href="#' + playlist + '" rel="#' + playlist + '">'+ playlist +'</a></li>');
    playlists_ul.append(playlist_li);

    var playlist_pane = $('<div id="' + playlist + '" class="'+playlist+' playlist-tab category-body grid_12 omega"></div>');
    playlist_pane.data('index', i);
    category_div.append(playlist_pane);
  });
  $('#panes').append(category_div);
}

// =============================================//
// VIDEO TOOLS
// Tools for building/modifying/removing a video
// =============================================//
function removeVideo(video_id) {
  $('#video-inner object, #video-inner iframe').remove();
}

function addVideo(video_id) {
  $('#loading-error').hide();
  var params = buildParams(video_id);
  var player = brightcove.createElement("object");
  player.id = 'player_' + video_id;

  var parameter;
  for (var i in params) {
    parameter = brightcove.createElement("param");
    parameter.name = i;
    parameter.value = params[i];
    player.appendChild(parameter);
  };

  var playerContainer = document.getElementById('video-inner');
  brightcove.createExperience(player, playerContainer, true);
}

function updateVideoMeta(video_title, video_id, video_download, video_wmv) {
  var new_meta = '<h2>&quot;' + video_title + '&quot;</h2> Download this Video: <a href="' + downloadServer+video_id + '" title="' + video_title + '">MP4</a>';
  if (video_wmv != undefined) {
    new_meta += ' | <a href="' + video_wmv +'" title="' + video_title + '">WMV</a> (For WMV, right click and “Save Target As...”)';
  }
  $('.video-meta').html(new_meta)
};

function buildParams(video_id) { // Params for Brightcove media player
  var params = {};
  params.videoId          = video_id;
  params.height           = "360";
  params.width            = "640";
  params.bgcolor          = "#FFFFFF";
  params.playerKey        = "AQ~~,AAAAut5PFhE~,47XVbbCXClqc4AgLm5zcsF33xRnvoGvX";
  params.isVid            = "true";
  params.isUI             = "true";
  params.dynamicStreaming = "true";
   params.autoStart        = "true";

  return params;
}

function sData(e){
	_gaq.push(['_trackEvent','Video Library','Play',e]);	
}
