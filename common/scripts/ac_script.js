// JavaScript Document

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName]
    }
    else {
        return document[movieName]
    }
}

function callExternalInterface(newURLString) {
	thisMovie('homeVid').sendToActionscript(newURLString);
	
	if(newURLString == "Vocations_Sem_500281")
	{
		var semID = document.getElementById('sem');
		var awakID = document.getElementById('awak');
		semID.innerHTML = '&nbsp;-&nbsp;Currently Playing';
		awakID.innerHTML = '';
	} else if(newURLString == "Awaken_Vocation_part2")
	{
		var semID = document.getElementById('sem');
		var awakID = document.getElementById('awak');
		semID.innerHTML = '';
		awakID.innerHTML = '&nbsp;-&nbsp;Currently Playing';
	}
}