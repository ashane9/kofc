String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var markedCountries = [];
var currentHoverCountry;
var currentLine;
var currentCountry;
var currentLineShadow;
var currentCountryShadow;
$('document').ready(function(){
  $.getJSON('/common/scripts/liberties/world-en.json', function(map){
    $.getJSON('/common/scripts/liberties/data.json', function(data){
      $('#map').css({'background-image': 'none'});
      $('#map').bind('mouseout', function(){
        $('#countryname').fadeOut(100);
        $(document).unbind('mousemove');
        $(currentHoverCountry).mouseout();
      });
      var r = Raphael('map', 960, 600);
      var attributes = {
        'fill': '#ffffff',
        'fill-opacity': 0,
        'stroke': '#dddddd',
        'stroke-opacity': 1,
        'stroke-width': 2,
        'stroke-linejoin': 'round'
      };
      var animMultiplier = 0;
      _.each(map.paths, function(country, idx){
        var countryPath = r.path(country.path).attr(attributes);
        if (data.countries.hasOwnProperty(idx)) {
          countryPath.attr({'fill': data.categories[data.countries[idx].category].fill});
          $(countryPath.node).data('text', '<h2 class="title">' + data.countries[idx].name + '</h2><p>' + data.countries[idx].text + '</p>');
          $(countryPath.node).data('countryName', data.countries[idx].name);
          $(countryPath.node).bind('click', {rObj: countryPath}, handleCountryClick);
          $(countryPath.node).bind('mouseenter mouseleave', {rObj: countryPath}, handleCountryHover);
          markedCountries.push(countryPath);
        }
      });
      
      animateInCountries(0);
      
      $('#map').click(function(e){
        hideCurrent();
      });
    });
  });
});

function animateInCountries(idx) {
  idx = idx | 0;
  setTimeout(function(){
    markedCountries[idx].animate({'fill-opacity': 1}, 500);
    if (++idx < markedCountries.length) {
      animateInCountries(idx);
    }
  }, 50);
}

function handleCountryHover(e) {
  switch (e.type) {
    case 'mouseenter':
      currentHoverCountry = e.currentTarget;
      if (e.fromElement !== $('#countryname')[0]) {
        var anotherCountry = _.detect(markedCountries, function(obj){
          return obj.node === e.fromElement;
        });
        if (!anotherCountry) {
          $(document).bind('mousemove', handleCountryMouseMove);
          $('#countryname').fadeIn(100);
        }
      }
      e.data.rObj.animate({'fill-opacity': 0.75}, 200);
      $('#countryname').html($(this).data('countryName'));
    break;
    case 'mouseleave':
      if (e.toElement !== $('#countryname')[0]) {
        var anotherCountry = _.detect(markedCountries, function(obj){
          return obj.node === e.toElement;
        });
        if (!anotherCountry) {
          $('#countryname').fadeOut(100);
          $(document).unbind('mousemove');
        }
        e.data.rObj.animate({'fill-opacity': 1}, 200);
      }
    break;
  }
  e.stopImmediatePropagation();
}

function handleCountryMouseMove(e) {
  $('#countryname').css({top: e.pageY - 25, left: e.pageX + 5});
}

function handleCountryClick(e) {
  e.stopPropagation();
  if (currentCountry === e.data.rObj) {
    return false;
  }
  hideCurrent(function(){
    e.data.rObj.scale(1.3);
    var bBox = e.data.rObj.getBBox();
    e.data.rObj.scale(1);
    currentCountryShadow = e.data.rObj.paper.path(e.data.rObj.attrs.path).attr({'fill': '#000000', 'fill-opacity': 0, 'stroke-opacity': 0}).scale(1);
    currentCountryShadow.blur(4);
    e.data.rObj.toFront();
    currentCountryShadow.animate({'scale': 1.3, 'fill-opacity': 1}, 500, 'backOut');
    e.data.rObj.animate({'scale': 1.3}, 500, 'backOut');
    currentCountry = e.data.rObj;
    setTimeout(function(){
      var description = $('#description');
      var isRight = false;
      if ($(currentCountry.node).data('countryName') == "Cuba" || $(currentCountry.node).data('countryName') == "Venezuela") {
        description.css({top: 100, left: 500});
        isRight = true;
      }
      else {
        description.css({top: 100, left: 10});
      }
      description.html($(currentCountry.node).data('text'));
      var pCoord = {
        x1: bBox.x + bBox.width / 2, 
        y1: bBox.y + bBox.height / 2,
        x2: parseInt(description.css('left')) + description.outerWidth() / 2,
        y2: parseInt(description.css('top'))
      };
      var gradient = (pCoord.y2 - pCoord.y1) / (pCoord.x2 - pCoord.x1);
      var rot = Math.atan(gradient);
      currentLine = e.data.rObj.paper.path('M{0},{1} A500,500 {2} 0 {3} {4},{5}'.format(pCoord.x1, pCoord.y1, rot, isRight ? 1 : 0, pCoord.x2, pCoord.y2)).attr({'stroke': '#ffffff', 'stroke-width': 0, 'stroke-dasharray': ['.'], 'stroke-linecap': 'round'});
      currentLineShadow = e.data.rObj.paper.path('M{0},{1} A500,500 {2} 0 {3} {4},{5}'.format(pCoord.x1, pCoord.y1, rot, isRight ? 1 : 0, pCoord.x2, pCoord.y2)).attr({'stroke': '#000000', 'stroke-width': 4, 'stroke-dasharray': ['.'], 'stroke-linecap': 'round'});
      currentLineShadow.blur(2);
      currentLine.toFront();
      currentLine.animate({'stroke': '#ffffff', 'stroke-width': 4}, 300);
      description.fadeIn(400);
    }, 300);
  });
  
  return false;
}

function hideCurrent(callback) {
  if (currentLine) {
    currentCountry.animate({scale: 1}, 400, 'backOut');
    currentCountryShadow.remove();
    
    currentLine.animate({'stroke-width': 0}, 300, function(){
      currentLine.remove();
    });
  }
  
  if (currentLineShadow) {
    currentLineShadow.animate({'stroke-width': 0}, 300, 'backOut', function(){
      currentLineShadow.remove();
    });
  }
  
  $('#description').fadeOut(400, callback);
}


// var xM = (pCoord.x1 + pCoord.x2) / 2;
// var yM = (pCoord.y1 + pCoord.y2) / 2;
// var d = 200;
// var x = pCoord.x2 - pCoord.x1;
// var y = pCoord.y2 - pCoord.y1;
// var l = Math.sqrt(x * x, y * y);
// var xPrime = -y / l;
// var yPrime = x / l;
// var xN = xPrime * d + xM;
// var yN = yPrime * d + yM;
// var gradient = (pCoord.y2 - pCoord.y1) / (pCoord.x2 - pCoord.x1);
// var rot = Math.atan(gradient);
// var path = e.data.rObj.paper.path().moveTo(pCoord.x1, pCoord.y1).curveTo(xN, yN, pCoord.x2, pCoord.y2).attr({'stroke': '#ff0000', 'stroke-width': 0, 'stroke-dasharray': ['-']});
