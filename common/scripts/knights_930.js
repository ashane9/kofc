/*
 Filename: knights.js
 Original author: B. Menoza
 Creation date: 7/11/2003
 Version: 4
 Modified by: bmenoza on 7/15/2003

Shah Khatri added the KofC_getLanguageLink function on 5/31/06.  Modified it again on 3/4/07 and
  3/8/07, as follows: Added a "goToCurrentSiteHomePage" (boolean) parameter.  If it is true, the new
  link refers to the current site's home page in the new language.  Otherwise, the new link refers to
  kofc.org.
Shah Khatri copied David Gianetti's language-cookie related functions on 6/12/06
Shah Khatri updated the image path in KofC_rotateHomePageImage() on 2/24/07
Shah Khatri removed call to KofC_ChooseCSS() from within this file on 2/25/07
Shah Khatri updated KofC_ChooseCSS() on 2/25/07

 Copyright (c) 2003 Molecular, Inc.
 343 Arsenal St.
 Watertown, MA 02472
 (617) 218-6500
 http://molecular.com
*/

var initialFolder = "/";
var currentWebSite = "other";
var KOFC_COOKIE = "CFCLIENT_KOFC";
var KOFC_COOKIE_PATH = "/";
var KOFC_COOKIE_DURATION_IN_DAYS = 365.25 * 2;
var LANGUAGE_KEY = "languagecode";

function KofC_ChooseCSS(pc_css,mac_css) {
    var stylesheet;
    if (navigator.userAgent.toLowerCase().indexOf('mac_ppc') != -1) { // AOL 5, MAC OS 9
      stylesheet = mac_css;
      if (! pc_css) { // No parameters passed
        stylesheet = "../styles/knights-mac_930.css";
      }
      else if (pc_css == "930") { // The Anniversary site passes only one parameter: 930
        stylesheet = "../styles/knights-mac_930.css";
      }
    }
    else {
      stylesheet = pc_css;
      if (! pc_css) { // No parameters passed
        stylesheet = "../styles/knights_930.css";
      }
      else if (pc_css == "930") { // The Anniversary site passes only one parameter: 930
        stylesheet = "../styles/knights_930.css";
      }
    }
    document.write('<link rel="STYLESHEET" type="text/css" href="' + stylesheet + '">');
} // End of function KofC_ChooseCSS(pc_css) {

function KofC_ChangeState(id,state) {
    if (document.getElementById) { // NETSCAPE 6, IE 5.X+
        document.getElementById(id).className = state;
    } else if (document.all) {
        document.all[id].className = state;
    }
}

function KofC_OpenNewWindow(url,type,name,w,h) {
    var type;
    var new_win;
    var features;
    var toolbar;
    var location;
    var statusbar;
    var menubar;
    var resizable;
    var scrollbars;
    type = type.toLowerCase();
    if (type == 'html') {
        h=h-50;
        toolbar = 1;
        location = 1;
        statusbar = 1;
        menubar = 1;
        resizable = 'yes';
        scrollbars = 1;
        features =
        'height=' + h + ',' +
        'width=' + w + ',' +
        'top=' + (screen.height - h)/6 + ',' +
        'left=' + (screen.width - w)/2 + ',' +
        'toolbar=' + toolbar + ',' +
        'location=' + location + ',' +
        'statusbar=' + statusbar + ',' +
        'menubar=' + menubar + ',' +
        'resizable=' + resizable + ',' +
        'scrollbars=' + scrollbars;
    }
    else if (type == 'media') {
        toolbar = 0;
        location = 0;
        statusbar = 1;
        menubar = 0;
        resizable = 'no';
        scrollbars = 1;
        features =
        'height=' + h + ',' +
        'width=' + w + ',' +
        'top=' + (screen.height - h)/2 + ',' +
        'left=' + (screen.width - w)/2 + ',' +
        'toolbar=' + toolbar + ',' +
        'location=' + location + ',' +
        'statusbar=' + statusbar + ',' +
        'menubar=' + menubar + ',' +
        'resizable=' + resizable + ',' +
        'scrollbars=' + scrollbars;
    }
    else if (type == 'warning') {
        toolbar = 0;
        location = 0;
        statusbar = 1;
        menubar = 0;
        resizable = 'no';
        scrollbars = 1;
        features =
        'height=400' + ',' +
        'width=600' + ',' +
        'top=' + (screen.height - h)/2 + ',' +
        'left=' + (screen.width - w)/2 + ',' +
        'toolbar=' + toolbar + ',' +
        'location=' + location + ',' +
        'statusbar=' + statusbar + ',' +
        'menubar=' + menubar + ',' +
        'resizable=' + resizable + ',' +
        'scrollbars=' + scrollbars;
    }
    else if (type == 'flash') {
        toolbar = 0;
        location = 0;
        statusbar = 1;
        menubar = 0;
        resizable = 'no';
        scrollbars = 0;
        features =
        'height=' + h + ',' +
        'width=' + w + ',' +
        'top=' + (screen.height - h)/2 + ',' +
        'left=' + (screen.width - w)/2 + ',' +
        'toolbar=' + toolbar + ',' +
        'location=' + location + ',' +
        'statusbar=' + statusbar + ',' +
        'menubar=' + menubar + ',' +
        'resizable=' + resizable + ',' +
        'scrollbars=' + scrollbars;
    }
    else {
        toolbar = 0;
        location = 1;
        statusbar = 0;
        menubar = 0;
        resizable = 'yes';
        scrollbars = 1;
        features =
        'height=' + h + ',' +
        'width=' + w + ',' +
        'top=' + (screen.height - h)/4 + ',' +
        'left=' + (screen.width - w)/2 + ',' +
        'toolbar=' + toolbar + ',' +
        'location=' + location + ',' +
        'statusbar=' + statusbar + ',' +
        'menubar=' + menubar + ',' +
        'resizable=' + resizable + ',' +
        'scrollbars=' + scrollbars;
    }

    new_win = window.open(url,name,features) ;
    new_win.focus();
}

function KofC_determineOS() {
    var isOSX;
    if (navigator.userAgent.toLowerCase().indexOf('os x') != -1) { // MAC OS X
        isOSX = true;
    }
    else {
        isOSX = false;
    }
}

function KofC_rotateHomePageImage() {
    var randomNumber = Math.floor(3*Math.random()+1);
    var randomImage = '/common/graphics/level0_photo'+randomNumber+'.jpg';
    document.writeln('<img src="'+randomImage+'" alt="Three men" title="Three men" width="353" height="130" vspace="4" border="0">');
}

function KofC_rotateImage(imageDirectory,imageArray,alt,width,height) {
    var randomNumber = Math.floor(imageArray.length * Math.random());   
    var randomImage = imageDirectory + "/" + imageArray[randomNumber];    
    
    document.writeln('<img src="' + randomImage + '" alt="' + alt + '" title="' + alt +
                     '" width="' + width + '"height="' + height + '" vspace="4" border="0">');
} // End of function KofC_rotateImage(imageDirectory,imageArray,alt,width,height) {

function getQueryStringValue(paramName){
    // GET THE &param=value pairs to the right of the ?
    var qString = window.location.href.split("?")[1];
    var paramArray = qString.split("&")

    for(var i=0;i<paramArray.length;i++){
        var temp = paramArray[i].split("=")
        if(temp[0] == paramName) return (temp[1]);
    }

}
function KofC_limitTextarea(limitField, limitNum, limitDisclaimer) {
    var oDisclaimer;
    if (document.getElementById) {
        oDisclaimer = document.getElementById(limitDisclaimer);
    }
    else if (document.all) {
        oDisclaimer = document.all[limitDisclaimer];
    }
    if (limitField.value.length > limitNum) {
        //limitField.value = limitField.value.substring(0, limitNum);
        oDisclaimer.style.display = "block";
    }
    else {
        oDisclaimer.style.display = "none";
    }
}

/* function CalculateTotal(frm, elementStartNo, elementEndNo, sectionName) {
    var order_total = 0

    for (var i=elementStartNo; i < elementEndNo; i++) {
        form_field = frm.elements[i]
        item_quantity = parseInt(form_field.value)

            if (item_quantity >= 0) {
                order_total += item_quantity
            }
        }

    //frm.sectionName.value = order_total
	eval("frm."+sectionName+".value = order_total");
} */

function KofC_getLanguageLink(currentLanguageCode, newLanguageCode, goToCurrentSiteHomePage,
                              coordinates, altText) {

  var newLanguageName = "English";
  if (newLanguageCode == "es") {
    newLanguageName = "Espa&ntilde;ol";
  }
  else if (newLanguageCode == "fr") {
    newLanguageName = "Fran&ccedil;ais";
  }
  else if (newLanguageCode == "pl") {
    newLanguageName = "Polski";
  }

  var regExp;
  var newHRef;
  if (goToCurrentSiteHomePage) {
// Example current page: /eb/pl/leadership_institute/surge_with_service/youth/index.html
// Example new page: /eb/en/leadership_institute/index.html
    regExp = new RegExp("/" + currentLanguageCode + "/([^/]+)/.*");
    newHRef = location.href.replace(regExp,"/" + newLanguageCode + "/$1/index.html");
  }
  else {
// Example current page: /eb/fr/news/releases/detail/547760.html
// Example new page: /eb/en/news/releases/index.html
    regExp = new RegExp("/" + currentLanguageCode + "/");
    newHRef = location.href.replace(regExp,"/" + newLanguageCode + "/");
    regExp = new RegExp("/detail/\\d+\\.html.*");
    newHRef = newHRef.replace(regExp,"/index.html");
  }
  
  var commonString = '" href="' + newHRef + '" onClick="KofC_setCookie(\'' +
      KOFC_COOKIE + '\',\'' + LANGUAGE_KEY + '=' + newLanguageCode + '#\',\'' +
      KofC_cookieExpiration(KOFC_COOKIE_DURATION_IN_DAYS) + '\');">'
      
  if (currentWebSite == 'Museum') {
    document.write('<area shape="rect" coords="' + coordinates + '" alt="' + altText +
                   commonString);
  }
  else {
    document.write('<A class="UtilityLink"' + commonString + newLanguageName + '</A>');
  }

} // End of function KofC_getLanguageLink(currentLanguageCode, newLanguageCode, ...) {

function KofC_getCookie(cookieName,key) {
    var docCookie = document.cookie;
    
    if (! docCookie.length) {
       return;
    }
    
    var offset = docCookie.indexOf(cookieName + "=");
    if (offset < 0) {
      return;
    }    
    offset += cookieName.length + 1;
    var end = docCookie.indexOf(";", offset);
    if (end < 0) {
      end = docCookie.length;
    }    

    var myCookieValue = unescape(docCookie.substring(offset, end));
    
    offset = myCookieValue.indexOf(key + "=");
    if (offset < 0) {
      return;
    }
    offset += key.length + 1;
    end = myCookieValue.indexOf("#", offset);
    if (end < 0) {
      end = myCookieValue.length;
    }
    
    return myCookieValue.substring(offset, end);
} // End of function KofC_getCookie(cookie_name,key) {

function KofC_forwardUser(fURI) {
	var result = KofC_getCookie(KOFC_COOKIE,LANGUAGE_KEY);
	
//alert("The cookie is: " + result);
		
	if (result) {
		KofC_redirect(initialFolder + result + fURI);
	} else {
		KofC_redirect(initialFolder + "en/" + fURI);
	}	
} // End of function KofC_forwardUser() {

function KofC_redirect(fURI) {
  window.location = fURI;
} // End of function KofC_redirect() {

function KofC_cookieExpiration(numDays) {
    var now = new Date();
    var expires = new Date();
    expires.setTime(now.getTime() + numDays * 1000 * 60 * 60 * 24);
    return expires.toGMTString();
} // End of function KofC_cookieExpiration(numDays) {

function KofC_setCookie(name, value, expire) {
    document.cookie = name + "=" + escape(value) +
      ((expire == null) ? "" : ("; expires=" + expire)) +
        "; path=" + KOFC_COOKIE_PATH;
} // End of function KofC_setCookie(name, value, expire) {

function padWithZeroes(myNumber,myTotalLength) {
  var myString = myNumber.toString();
  while (myString.length < myTotalLength) {
    myString = "0" + myString;
  }
  return myString;
} // End of function padWithZeroes() {

function getCurrentPublicationYearAndMonth(roundUp) {
  var mydate=new Date();
  var year=mydate.getYear();
  if (year < 2000) {
    year+=1900;
  }
  var month=mydate.getMonth() + 1;
  var daym=mydate.getDate();

  if (roundUp && daym >= 26) {
    if (month >= 12) {
      month = 1;
      year++;
    }
    else {
      month++;
    }
  } // if (roundUp && daym >= 26) {
  
  return year.toString() + padWithZeroes(month,2);
} // End of function getCurrentPublicationYearAndMonth(roundUp) {

function testURL(URLToBeTested) {
  new AJAXRequest(
    'HEAD',
    URLToBeTested,
    null,
    processTestURL,
    true,
    true
  );
} // function testURL(URLToBeTested) {

function processTestURL(rObj) {
/* only if rObj shows "loaded" */
  if (rObj.readyState==4) {
    if (rObj.status != 200 && rObj.status != 0) { /* only if not "OK" */
      targetURI = fallbackURI;
    }
    KofC_redirect(targetURI);
  }
} // function processTestURL(rObj) {

KofC_determineOS();