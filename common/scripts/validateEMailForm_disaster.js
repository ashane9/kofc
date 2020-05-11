var RED = "displayBad";
var LABEL = "_label";
var ERROR_DIV = "errorDiv";

var REQ_STRING;
var EMAIL_STRING;
var PHONE_STRING;

var PHONE_REGEX_1 = /\d{3}-\d{3}-\d{4}/;
var PHONE_REGEX_2 = /\d{3} \d{3} \d{4}/;
var PHONE_REGEX_3 = /\d{3}\d{3}\d{4}/;
var EMAIL_REGEX = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/;

     /* This script and many more are available free online at The JavaScript Source!! http://javascript.internet.com Created by: Corneliu Lucian 'Kor' Rusu | corneliulucian[at]gmail[dot]com */
     var COMMENT_CHAR={'special':/['\<'&'\>'&'\='&'\\'&'\+'&'\^'&'\%'&'\;'&'\*'&'\`'&'\"'&'\|'&'\~'&'\('&'\)'&'\['&'\]']/g}

var PREFERRED_FIELD_NAME = "preferredMethodOfContact";

var HOME_PHONE_FIELD_NAME = "homePhone";
var HOME_PHONE_LABEL;
var HOME_PHONE_REQUIRED_LABEL;

var WORK_PHONE_FIELD_NAME = "workPhone";
var WORK_PHONE_LABEL;
var WORK_PHONE_REQUIRED_LABEL;

var CELL_PHONE_FIELD_NAME = "cellPhone";
var CELL_PHONE_LABEL;
var CELL_PHONE_REQUIRED_LABEL;

var EMAIL_FIELD_NAME = "email";
var EMAIL_LABEL;
var EMAIL_REQUIRED_LABEL;

var COUNCIL_NAME = "councilNumber";
var COUNCIL_LABEL
var COUNCIL_REQUIRED_LABEL

var FAX_FIELD_NAME = "fax";

$("document").ready(function (){
	checkLang(document.location);							  
});

     function valid(o,w){
       o.value = o.value.replace(COMMENT_CHAR[w],'');
     }

function checkLang(str){
	
	var regExp = "/^" + str + "/g";
	var en = "/en/";
 	var es = "/es/";
	var fr = "/fr/";
 	var pl = "/pl/";
	
	if(regExp.match(en)){
		
		REQ_STRING = "<p>Please review the fields for correction.<br/>The fields marked with (*) are required for submisssion.</p>";
		EMAIL_STRING = "<p>Your email address is not formatted correctly</p>";
		PHONE_STRING = "<p>Your phone or fax number is not formatted correctly.<br/>Accepted formats are xxx-xxx-xxxx or xxx xxx xxxx</p>";
		HOME_PHONE_LABEL = "Home Phone:";
		HOME_PHONE_REQUIRED_LABEL = "Home Phone:*";
		WORK_PHONE_LABEL = "Work Phone:";
		WORK_PHONE_REQUIRED_LABEL = "Work Phone:*";
		CELL_PHONE_LABEL = "Cell Phone:";
		CELL_PHONE_REQUIRED_LABEL = "Cell Phone:*";
		COUNCIL_LABEL = "Council Number:";
		COUNCIL_REQUIRED_LABEL = "Council Number:*";
		EMAIL_LABEL = "E-Mail:*";
		EMAIL_REQUIRED_LABEL = "E-Mail:*";
	} else if(regExp.match(es)){
		
		REQ_STRING = "<p>Por favor revise la correcci&#243;n de los campos siguientes.<br />Los campos marcados con (*) son indispensables para el envio.</p>";
		EMAIL_STRING = "<p>Su direcci&#243;n electr&#243;nica no tiene el formato correcto</p>";
		PHONE_STRING = "<p>Su n&#250;mero de tel&#233;fono o fax no tiene el formato correcto<br />Los formatos aceptados son xxx-xxx-xxxx &#243; xxx xxx xxxx</p>";
		HOME_PHONE_LABEL = "Tel&#233;fono de la Casa:";
		HOME_PHONE_REQUIRED_LABEL = "Tel&#233;fono de la Casa:*";
		WORK_PHONE_LABEL = "Tel&#233;fono de la Oficina:";
		WORK_PHONE_REQUIRED_LABEL = "Tel&#233;fono de la Oficina:*";
		CELL_PHONE_LABEL = "Tel&#233;fono de la Oficina:";
		CELL_PHONE_REQUIRED_LABEL = "Tel&#233;fono de la celulares:*";
		COUNCIL_LABEL = "N&#250;mero del Consejo:";
		COUNCIL_REQUIRED_LABEL = "N&#250;mero del Consejo:*";
		EMAIL_LABEL = "Corr&#233;a Electr&#243;nico:";
		EMAIL_REQUIRED_LABEL = "Corr&#233;a Electr&#243;nico:*";
	} else if(regExp.match(fr)){
		
		REQ_STRING = "<p>Veuillez r&#233;viser et corriger, s'il y a lieu, les champs suivants.<br />Les champs marqu&#233;s d'un (*) sont obligatoires.</p>";
		EMAIL_STRING = "<p>Votre adresse courriel n'est pas format&#233;e correctement.</p>";
		PHONE_STRING = "<p>Votre num&#233;ro de t&#233;l&#233;phone ou de t&#233;l&#233;copieur n'est pas format&#233; correctement.<br />Le format admis pour l'un ou l'autre: xxx-xxx-xxxx."
		HOME_PHONE_LABEL = "T&#233;l&#233;phone R&#233;sidential:";
		HOME_PHONE_REQUIRED_LABEL = "T&#233;l&#233;phone R&#233;sidential:*";
		WORK_PHONE_LABEL = "T&#233;l&#233;phone d'Affaires:";
		WORK_PHONE_REQUIRED_LABEL = "T&#233;l&#233;phone d'Affaires:*";
		CELL_PHONE_LABEL = "T&#233;l&#233;phone d'Affaires:";
		CELL_PHONE_REQUIRED_LABEL = "T&#233;l&#233;phone cellulaire:*";
		COUNCIL_LABEL = "Num&#233;ro du conseil:";
		COUNCIL_REQUIRED_LABEL = "Num&#233;ro du conseil:*";
		EMAIL_LABEL = "Courriel:*";
		EMAIL_REQUIRED_LABEL = "Courriel:*";
	}
}

function handlePreferredSelection()
{
	var ob = document.getElementById(PREFERRED_FIELD_NAME);
	
	if(ob.value.indexOf("Cell") != -1 || ob.value.indexOf("cell") != -1)
	{
		handleField(true, CELL_PHONE_FIELD_NAME, CELL_PHONE_LABEL, CELL_PHONE_REQUIRED_LABEL);
		handleField(false, WORK_PHONE_FIELD_NAME, WORK_PHONE_LABEL, WORK_PHONE_REQUIRED_LABEL);
		handleField(false, HOME_PHONE_FIELD_NAME, HOME_PHONE_LABEL, HOME_PHONE_REQUIRED_LABEL);
	}
	else if(ob.value.indexOf("Work") != -1 || ob.value.indexOf("work") != -1)
	{
		handleField(false, CELL_PHONE_FIELD_NAME, CELL_PHONE_LABEL, CELL_PHONE_REQUIRED_LABEL);
		handleField(true, WORK_PHONE_FIELD_NAME, WORK_PHONE_LABEL, WORK_PHONE_REQUIRED_LABEL);
		handleField(false, HOME_PHONE_FIELD_NAME, HOME_PHONE_LABEL, HOME_PHONE_REQUIRED_LABEL);
/* handleField(false, EMAIL_FIELD_NAME, EMAIL_LABEL, EMAIL_REQUIRED_LABEL); Since
E-Mail Address is required, let's not do this.  Shah Khatri 3/17/09 */
	}
	else if(ob.value.indexOf("Home") != -1 || ob.value.indexOf("home") != -1)
	{
		handleField(false, CELL_PHONE_FIELD_NAME, CELL_PHONE_LABEL, CELL_PHONE_REQUIRED_LABEL);
		handleField(false, WORK_PHONE_FIELD_NAME, WORK_PHONE_LABEL, WORK_PHONE_REQUIRED_LABEL);
		handleField(true, HOME_PHONE_FIELD_NAME, HOME_PHONE_LABEL, HOME_PHONE_REQUIRED_LABEL);
/* handleField(false, EMAIL_FIELD_NAME, EMAIL_LABEL, EMAIL_REQUIRED_LABEL); Since
E-Mail Address is required, let's not do this.  Shah Khatri 3/17/09 */
	}
	else if(ob.value.indexOf("E-mail") != -1 || ob.value.indexOf("e-mail") != -1)
	{
		handleField(false, CELL_PHONE_FIELD_NAME, CELL_PHONE_LABEL, CELL_PHONE_REQUIRED_LABEL);
		handleField(false, WORK_PHONE_FIELD_NAME, WORK_PHONE_LABEL, WORK_PHONE_REQUIRED_LABEL);
		handleField(false, HOME_PHONE_FIELD_NAME, HOME_PHONE_LABEL, HOME_PHONE_REQUIRED_LABEL);
/* handleField(true, EMAIL_FIELD_NAME, EMAIL_LABEL, EMAIL_REQUIRED_LABEL); Since
E-Mail Address is required, let's not do this.  Shah Khatri 3/17/09 */
	}
}

function chkTest(){
var obj1 = document.getElementById("member");
//alert(obj1);
if (obj1 != null){
if(obj1.checked){
//alert("Checked");
handleField(true, COUNCIL_NAME, COUNCIL_LABEL, COUNCIL_REQUIRED_LABEL);
}else{
handleField(false, COUNCIL_NAME, COUNCIL_LABEL, COUNCIL_REQUIRED_LABEL);
}
}
}

function handleField(b, field, label, reqiredLabel)
{
	var s = field + LABEL;
	var ob = document.getElementById(s);
	if(b)
	{
		ob.innerHTML = reqiredLabel;
		markBadField(field); // Added by Shah Khatri on 3/14/09
	}
	else
	{
		ob.innerHTML = label;
		markGoodField(field);
	}	
}

function isCellPhoneRequired()
{
	var s = CELL_PHONE_FIELD_NAME + LABEL;
//	alert("looking for " + s);
	var ob = document.getElementById(s);
	var nodes = ob.childNodes;
//	alert(nodes.length);
//	alert(nodes[0].data);
	if(nodes[0].data.indexOf("*") != -1 )
	{
		return true;
	}
	return false;
}

function isWorkPhoneRequired()
{
	var s = WORK_PHONE_FIELD_NAME + LABEL;
//	alert("looking for " + s);
	var ob = document.getElementById(s);
	var nodes = ob.childNodes;
//	alert(nodes.length);
//	alert(nodes[0].data);
	if(nodes[0].data.indexOf("*") != -1 )
	{
		return true;
	}
	return false;
}

function isHomePhoneRequired()
{
	var s = HOME_PHONE_FIELD_NAME + LABEL;
//	alert("looking for " + s);
	var ob = document.getElementById(s);
	var nodes = ob.childNodes;
//	alert(nodes.length);
//	alert(nodes[0].data);
	if(nodes[0].data.indexOf("*") != -1 )
	{
		return true;
	}
	return false;
}

function isEmailRequired()
{
	var s = EMAIL_FIELD_NAME + LABEL;
//	alert("looking for " + s);
	var ob = document.getElementById(s);
	var nodes = ob.childNodes;
//	alert(nodes.length);
//	alert(nodes[0].data);
	if(nodes[0].data.indexOf("*") != -1 )
	{
		return true;
	}
	return false;
}

function isCouncilRequired()
{
	var s = COUNCIL_NAME + LABEL;
//	alert("looking for " + s);
	var ob = document.getElementById(s);
	var nodes = ob.childNodes;
//	alert(nodes.length);
//	alert(nodes[0].data);
	if(nodes[0].data.indexOf("*") != -1 )
	{
		return true;
	}
	return false;
}

function validateAll(requiredFields)
{
	var b = validateForm(requiredFields);
	if(!b)
	{
		scrollTo(0,0);
		return false;
	}
	
	// got this far, passed required fields test
	if(!isEmpty(EMAIL_FIELD_NAME))
	{
		var ob = document.getElementById(EMAIL_FIELD_NAME);

		b = validateEmail(ob.value);
		if(!b)
		{
			scrollTo(0,0);
			return false;
		}
	}
	if(!isEmpty(HOME_PHONE_FIELD_NAME))
	{
		ob = document.getElementById(HOME_PHONE_FIELD_NAME);
		b = validatePhone(ob.value, HOME_PHONE_FIELD_NAME);
		if(!b)
		{
			scrollTo(0,0);
			return false;
		}
	}

	if(!isEmpty(CELL_PHONE_FIELD_NAME))
	{
		ob = document.getElementById(CELL_PHONE_FIELD_NAME);
		b = validatePhone(ob.value, CELL_PHONE_FIELD_NAME);
		if(!b)
		{
			scrollTo(0,0);
			return false;
		}
	}

	if(!isEmpty(WORK_PHONE_FIELD_NAME))
	{
		ob = document.getElementById(WORK_PHONE_FIELD_NAME);
		b = validatePhone(ob.value, WORK_PHONE_FIELD_NAME);
		if(!b)
		{
			scrollTo(0,0);
			return false;
		}
	}

	if(!isEmpty(FAX_FIELD_NAME)) // Fax validation added by Shah Khatri on 3/16/09
	{
		ob = document.getElementById(FAX_FIELD_NAME);
		b = validatePhone(ob.value, FAX_FIELD_NAME);
		if(!b)
		{
			scrollTo(0,0);
			return false;
		}
	}
	
/* 	if(!isEmpty(COUNCIL_NAME))
	{
		ob = document.getElementById(COUNCIL_NAME);
		b = validatePhone(ob.value, COUNCIL_NAME);
		if(!b)
		{
			scrollTo(0,0);
			return false;
		}
	} */
	
	
	return true;
}

function validatePhone(phone, phoneFieldName)
{
	
	var b = validPhone(phone);
	if(!b)
	{
		handleErrorDiv(PHONE_STRING);
		markBadField(phoneFieldName);		
	}
	return b;
}

function validPhone(phone)
{
	//alert("validPhone " + phone);
	var ret = true;
	var regex = PHONE_REGEX_1;
	var x = phone.match(regex);
	if(x == null)
	{
		regex = PHONE_REGEX_2;
		x = phone.match(regex);
		if(x == null)
		{
			regex = PHONE_REGEX_3;
			x = phone.match(regex);
			if(x == null)
			{
				ret = false;
			}
		}
	}
	return ret;
}


function validateEmail(email)
{
	
	var b = validEmail(email);
	if(!b)
	{
		handleErrorDiv(EMAIL_STRING);
		markBadField(EMAIL_FIELD_NAME);
	}
	return b;
}

function validEmail(email)
{
	var ret = true;
	var regex = EMAIL_REGEX;
	var x = email.match(regex);
	if(x == null)
	{
		ret = false;
	}
	return ret;
}





function validateForm(requiredFields)
{
	var noBadField = true;
	for(var i = 0; i < requiredFields.length; i++)
	{		
		var field = requiredFields[i];
		
		if(isEmpty(field))
		{			
			markBadField(field);
			noBadField = false;
		}
		else
		{
			markGoodField(field);
		}				
	}
	
	if(isCellPhoneRequired())
	{
		var field = CELL_PHONE_FIELD_NAME;
		if(isEmpty(field))
		{			
			markBadField(field);
			noBadField = false;
		}
		else
		{
			markGoodField(field);
		}		
	}
	
	if(isWorkPhoneRequired())
	{
		var field = WORK_PHONE_FIELD_NAME;
		if(isEmpty(field))
		{			
			markBadField(field);
			noBadField = false;
		}
		else
		{
			markGoodField(field);
		}		
	}
	
	if(isHomePhoneRequired())
	{
		var field = HOME_PHONE_FIELD_NAME;
		if(isEmpty(field))
		{			
			markBadField(field);
			noBadField = false;
		}
		else
		{
			markGoodField(field);
		}		
	}
	
	if(isEmailRequired())
	{
		var field = EMAIL_FIELD_NAME;
		if(isEmpty(field))
		{			
			markBadField(field);
			noBadField = false;
		}
		else
		{
			markGoodField(field);
		}		
	}
	
	
	if(isCouncilRequired())
	{
		var field = COUNCIL_NAME;
		if(isEmpty(field))
		{			
			markBadField(field);
			noBadField = false;
		}
		else
		{
			markGoodField(field);
		}		
	}	
	
	if(!noBadField)
	{
		handleErrorDiv(REQ_STRING);
	}
	return noBadField;
}

function handleErrorDiv(s)
{
	var ob = document.getElementById(ERROR_DIV);
	ob.innerHTML = s;
}

function markBadField(fieldId)
{
	try {
		var labelName = fieldId + LABEL;
		var ob = document.getElementById(labelName);
		ob.className = RED;
	} catch(err)
	{

	}
}

function markGoodField(fieldId)
{
	try {
		var labelName = fieldId + LABEL;
		var ob = document.getElementById(labelName);
		ob.className = "";
	} catch(err)
	{
	}
}


function isEmpty(fieldId)
{

	var ob = document.getElementById(fieldId);
	if(ob == null)
	{
		return true;
	}

	if(ob.value == "" || ob.value.length == 0)
	{
		return true;
	}
	return false;
}

function getFormName()
{
	var ob = document.getElementById("formName");
	return ob.value;		
}

function sendFormName(url) {
	url = url + "?formName=" + getFormName();
	new AJAXRequest(
			      'POST',
			      url,
			      null,
			      //processReqChange,
			      true,
			      true
			     );
} // End of function sendFormName(url) {

/*function processReqChange(req) 
{
    // only if req shows "loaded"
    if (req.readyState == 4) 
    {
        // only if "OK"
        if (req.status == 200 || req.status == 0) {
            // ...processing statements go here...
        	// in this case a noop
        } else 
        {
            alert("error req.status != 200\n" +
                req.statusText);
        }
    }
}*/


function validate() {
	return validateAll(requiredFields);
	
	submitForm();
}

function doAjax(url) {
//	alert("doAjax");
	req = false;
	url = url + "?formName=" + getFormName();
    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) 
    {
    	try 
    	{
			req = new XMLHttpRequest();
        } catch(e) 
        {
			req = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) 
    {
       	try 
       	{
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) 
      	{
        	try 
        	{
          		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) 
        	{
          		req = false;
        	}
		}
    }
	if(req) 
	{
		//req.onreadystatechange = processReqChange;
		req.open("POST", url, true);
		req.send("");
	}
}

$(document).ready(function(){					 
	doAjax('/formservice/initCounter.action');					 
});

function submitForm()
{
	document.contactResult.submit();
}


function checkBoxWithTextField(textField, checkboxObj){
	
	if(textField.value.length > 0){
	   document.getElementById(checkboxObj).checked = true;
	}
	else{
	   document.getElementById(checkboxObj).checked = false;
	}
	
}

