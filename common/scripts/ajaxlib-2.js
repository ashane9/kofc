/*
 * AJAXRequest: An encapsulated AJAX request. To run, call
 * new AJAXRequest( method, url, async, process, data )
 *
 */
function AJAXRequest( method, url, data, process, async, dosend) {
    // self = this; creates a pointer to the current function
    // the pointer will be used to create a "closure". A closure
    // allows a subordinate function to contain an object reference to the
    // calling function.

    var self = this;

    // check the dom to see if this is IE or not
    if (window.XMLHttpRequest) {
	// Not IE
        self.AJAX = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
	// Hello IE!
	// loops through the various versions of XMLHTTP to ensure we are using the latest
	var versions = ["Msxml2.XMLHTTP.7.0",
			"Msxml2.XMLHTTP.6.0",
			"Msxml2.XMLHTTP.5.0",
			"Msxml2.XMLHTTP.4.0",
			"Msxml2.XMLHTTP.3.0",
			"Msxml2.XMLHTTP",
			"Microsoft.XMLHTTP"];

         for (var i = 0; i < versions.length ; i++) {
	     try {
		 // try to create the object
		 // if it doesn not work, we will try again
		 // if it does work, we will save a reference to the proper one to speed up future instantiations
		 self.AJAX = new ActiveXObject(versions[i]);

		 if (self.AJAX) {
		     _ms_XMLHttpRequest_ActiveX = versions[i];
		     break;
		 }
	     }
	     catch (objException) {
		 // trap; try next one
	     }
	 }
    }

    // if no callback process is specified, then assing a default which executes the code returned by the server
    if (typeof process == 'undefined' || process == null) {
        process = executeReturn;
    }

    self.process = process;

    // create an anonymous function to log state changes
    self.AJAX.onreadystatechange = function( ) {
	if (self.AJAX.readyState != 4) {
	    return;
	}

        self.process(self.AJAX);
    }

    // if no method specified, then default to POST
    if (!method) {
        method = "POST";
    }

    method = method.toUpperCase();

    if (typeof async == 'undefined' || async == null) {
        async = true;
    }

    try {
	self.AJAX.open(method, url, async);
    } catch(err) {
	// Some error here!
	// Ideally we should redirect to a static page based on error type
	alert("Error encountered processing your request: " + err.message);

	return null;
    }

    if (method == "POST") {
        self.AJAX.setRequestHeader("Connection", "close");
        self.AJAX.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        self.AJAX.setRequestHeader("Method", "POST " + url + "HTTP/1.1");
    }

    // if dosend is true or undefined, send the request
    // only fails is dosend is false
    // you would do this to set special request headers
    if ( dosend || typeof dosend == 'undefined' ) {
	    if ( !data ) data="";
	    self.AJAX.send(data);
    }

    return self.AJAX;
}

function executeReturn( AJAX ) {
    if (AJAX.readyState == 4) {
        if (AJAX.status == 200) {
	    if ( AJAX.responseText ) {
		    eval(AJAX.responseText);
	    }
	}
    }
}

