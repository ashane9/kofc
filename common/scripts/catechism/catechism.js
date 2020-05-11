/**
 * @author dbuckno
 */

//Global variables that support pagination functionality
	var numItems = 0;
    var itemsPerPage = 6;
	var numPages =0;
	var safeToPaginate = false;
	var list = new Array;

/* 	var a = document.createElement('a');
	a.href = url;
	var hostname1 = a.hostname;
	alert(hostname1); */
	
	
//variables that support KOFC email functionality	
	var tld_ = new Array();
	tld_[0] = "com";
	tld_[1] = "org";
	tld_[2] = "net";
	tld_[3] = "ws";
	tld_[4] = "info";
	tld_[10] = "co.uk";
	tld_[11] = "org.uk";
	tld_[12] = "gov.uk";
	tld_[13] = "ac.uk";
	var m_ = "mailto:";
	var a_ = "@";
	var d_ = ".";
	var sub_ = "?subject=";

	// KOFC mails Display Email Address as link
	function KofcM1(name, params){
		var s = e(name,"kofc",1);
		document.write('<a href="'+m_+s+sub_+params+'">'+s+'</a>');
	}
	// KOFC mails Display text as link
	function KofcM2(name, display, params){
		var s = e(name,"kofc",1);
		document.write('<a href="'+m_+s+sub_+params+'">'+display+'</a>');
	}

	// display non kofc email address as link
	function mail(name, dom, tl, params){
		var s = e(name,dom,tl);
		document.write('<a href="'+m_+s+params+'">'+s+'</a>');
	}
	//display non kofc email text as link
	function mail2(name, dom, tl, params, display){
		document.write('<a href="'+m_+e(name,dom,tl)+params+'">'+display+'</a>');
	}

	function e(name, dom, tl){
		var s = name+a_;
		if (tl!=-2){
		   s+= dom;
		   if (tl>=0)
		   s+= d_+tld_[tl];
		}
		else{
		   s+= swapper(dom);
		}
		return s;
	}
	function swapper(d){
		var s = "";
		for (var i=0; i<d.length; i+=2)
			if (i+1==d.length)
				s+= d.charAt(i);
			else
				s+= d.charAt(i+1)+d.charAt(i);
		return s.replace(/\?/g,'.');
	}

function getJSONPart(partnumber){
	
	var content;
	var partName;
	setSafeToPaginate(false);
	$(document).ready(function(){
		$.getJSON('/catechismold/contentsjson.action', function(data,status){
			
			content = data.contents;
			
			$.each(content, function(i,v){  
				if(content[i].partNumber == partnumber &&
				   content[i].sectionNumber == '0'){
					partName = content[i].paragraphText;	
				}
			});
					
		});
	});
}

function getJSONSectionOrChap(){
	
	var contents;
	setSafeToPaginate(false);
	$.ajax({
		url: '/catechismold/contentsjson.action',
		type:'GET',
		async:false,
		dataType: 'json',
		success: function(data){
			contents = data.contents;
	    }

	});
	return contents;
}


//This function is the workhorse for getting the paragraphs and title on the body section
function getJSONSubContentBody(controlstring){
	var content;
	var headLinks;
	var sectionOrChapterName = [];
	var param = controlstring.split('&');
	var partparam = 
		param[0]+'&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&'+param[7]+'&'+param[8];
	var sectionparam = 
		controlstring.split('&chap',1)+'&chap=0&art=0&parasec=0&subsec=0&hdr=0&'+param[7]+'&'+param[8];
	var chapterparam = 
		controlstring.split('&art',1)+'&art=0&parasec=0&subsec=0&hdr=0&'+param[7]+'&'+param[8];
	var articleparam = 
		controlstring.split('&parasec',1)+'&parasec=0&subsec=0&hdr=0&'+param[7]+'&'+param[8];
	var paragraphparam = 
		controlstring.split('&subsec',1)+'&subsec=0&hdr=0&'+param[7]+'&'+param[8];
		
	var partnum = param[0].split('=');
	var sectnum = param[1].split('=');
	var chaptnum = param[2].split('=');
	var artnum = param[3].split('=');
	var parnum = param[4].split('=');

	// fix for breadcrumb navigation
	var part_head_fragment = param[0]+"&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1";
	
	setSafeToPaginate(false);

	if(partnum[1]== -2){
		headLinks ='<a href="#" onClick=javascript:getSubContent("'
			+part_head_fragment+'")>APOSTOLIC CONSTITUTION FIDEI DEPOSITUM</a>'+' > ';
	}
	if(partnum[1]== -1){
		headLinks ='<a href="#" onClick=javascript:getSubContent("'
			+part_head_fragment+'")>PROLOGUE </a>'+' > ';
	}
	if(partnum[1]>'0'){
		headLinks ='<a href="#" onClick=javascript:getSubContent("'
			+part_head_fragment+'")>PART '+partnum[1]+'</a>'+' > ';
	}
	if(sectnum[1]!='0'){
		headLinks +='<a href="#" onClick=javascript:getSubContent("'
			+sectionparam+'")>SECTION '+sectnum[1]+ '</a>'+' > ';
	}
	if(chaptnum[1] !='0'){
		headLinks +='<a href="#" onClick=javascript:getSubContent("'
			+chapterparam+'")>CHAPTER '+chaptnum[1]+'</a>'+' > ';
	}
	if(artnum[1]!='0'){
		headLinks +='<a href="#" onClick=javascript:getJSONSubContentBody("'
			+articleparam+'")>ARTICLE '+artnum[1]+'</a>'+' > ';
	}
	if(parnum[1]!='0'){
		headLinks +='<a href="#" onClick=javascript:getJSONSubContentBody("'
			+paragraphparam+'")>PARAGRAPH'+parnum[1]+'</a>';
	}
	$(document).ready(function() {
		$.getJSON('/catechismold/getsectionjson.action?'+controlstring).done(function(data,status){	
			content = data.text;
			clearContentArea();	
			$('div.leadtitle').text(content[0].title);
			$('div.leadtitle').append('<br>' + headLinks);
			$.each(content, function(i,v){  			
				$('div.leadbody').append(content[i].paragraphText);
			});		
		});
	});
}


//This function gets the contents that re returned when the links on the body
//headings are clicked.
function getSubContent(controlString){
	
	var param;
	var subsection = [];
	
	var indent = '&nbsp;&nbsp;';
	
	
	var contentparam = controlString.split('&');
	var partparam = contentparam[0]+'&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&'
					+contentparam[7]+'&'+contentparam[8];
	var sectionparam = controlString.split('&chap',1)+'&chap=0&art=0&parasec=0&subsec=0&hdr=0&'
					+contentparam[7]+'&'+contentparam[8];
	var chapterparam = controlString.split('&art',1)+'&art=0&parasec=0&subsec=0&hdr=0&'
					+contentparam[7]+'&'+contentparam[8];
	var articleparam = controlString.split('&parasec',1)+'&parasec=0&subsec=0&hdr=0&'
					+contentparam[7]+'&'+contentparam[8];
	var paragraphparam = controlString.split('&subsec',1)+'&subsec=0&hdr=0&'
					+contentparam[7]+'&'+contentparam[8];
		
	var partnum = contentparam[0].split('=');
	var sectnum = contentparam[1].split('=');
	var chaptnum = contentparam[2].split('=');
	var artnum = contentparam[3].split('=');
	var parnum = contentparam[4].split('=');

	// fix for breadcrumb navigation
	var part_head_fragment = contentparam[0]+"&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1";

	setSafeToPaginate(false);
	
	if(partnum[1]!='0' && partnum[1] > 0){
		headLinks ='<a href="#" onClick=javascript:getSubContent("'
			+part_head_fragment+'")>PART '+partnum[1]+'</a>'+' > ';
	}else if(partnum[1]!='0' && partnum[1] == -2){
		headLinks ='<a href="#" onClick=javascript:getSubContent("'
			+part_head_fragment+'")>APOSTOLIC CONSTITUTION FIDEI DEPOSITUM</a>'+' > ';
	}else if(partnum[1]!='0' && partnum[1] == -1){
		headLinks ='<a href="#" onClick=javascript:getSubContent("'
			+part_head_fragment+'")>PROLOGUE</a>'+' > ';
	}
	
	if(sectnum[1]!='0'){
		headLinks +='<a href="#" onClick=javascript:getSubContent("'
			+sectionparam+'")>SECTION '
		+sectnum[1]+ '</a>'+' > ';
	}
	if(chaptnum[1] !='0'){
		headLinks +='<a href="#" onClick=javascript:getSubContent("'
			+chapterparam+'")>CHAPTER '+chaptnum[1]+'</a>'+' > ';
	}
	if(artnum[1]!='0'){
		headLinks +='<a href="#" onClick=javascript:getJSONSubContentBody("'
			+articleparam+'")>ARTICLE '+artnum[1]+'</a>'+' > ';
	}
	if(parnum[1]!='0'){
		headLinks +='<a href="#" onClick=javascript:getJSONSubContentBody("'
			+paragraphparam+'")>PARAGRAPH'+parnum[1]+'</a>';
	}
	
	$.getJSON('/catechismold/subcontentsjson.action?' + controlString).done(function(data,status){
		
		subcontent = data.subcontents;	
		clearContentArea();
		$('div.leadtitle').append(headLinks);
		$.each(subcontent, function(i,v){
			
			param ='part='+subcontent[i].partNumber;
			param+='&sec='+subcontent[i].sectionNumber;
			param+='&chap='+subcontent[i].chapterNumber;
			param+='&art='+subcontent[i].articleNumber;
			param+='&parasec='+subcontent[i].paragraphSectionNumber;
			param+='&subsec='+subcontent[i].subsectionNumber;
			param+='&hdr='+subcontent[i].headerNumber;
			param+='&par='+subcontent[i].paragraphNumber;
			param+='&paratype='+subcontent[i].paragraphType;
			
			if(subcontent[i].paragraphType =='2'){
				 subsection[i] = subcontent[i].paragraphText;
				 $('div.leadbody').append(indent+'<a href="#"onClick=javascript:getJSONSubContentBody("'+param+'")>'+
						 subcontent[i].paragraphText+'</a><br />');
			}else if(subcontent[i].paragraphType =='3'){
				 subsection[i] = subcontent[i].paragraphText;
				 $('div.leadbody').append(indent+indent+'<a href="#"onClick=javascript:getJSONSubContentBody("'+param+'")>'+
						 subcontent[i].paragraphText+'</a><br />');
			}else if(subcontent[i].paragraphType =='4'){
				 subsection[i] = subcontent[i].paragraphText;
				 $('div.leadbody').append(indent+indent+indent+'<a href="#"onClick=javascript:getJSONSubContentBody("'+param+'")>'+
						 subcontent[i].paragraphText+'</a><br />');
			}else if(subcontent[i].paragraphType =='5'){
				 subsection[i] = subcontent[i].paragraphText;
				 $('div.leadbody').append(indent+indent+indent+indent+
						 '<a href="#"onClick=javascript:getJSONSubContentBody("'+param+'")>'+subcontent[i].paragraphText+'</a><br />');
		    }else if(subcontent[i].paragraphType =='6'){
				 subsection[i] = subcontent[i].paragraphText;
				 $('div.leadbody').append(indent+indent+indent+indent+indent+
						 '<a href="#"onClick=javascript:getJSONSubContentBody("'+param+'")>'+subcontent[i].paragraphText+'</a><br />');
			}else if(subcontent[i].paragraphType =='7'){
				$('div.leadbody').append(indent+indent+indent+
				indent+indent+indent+'<a href="#"onClick=javascript:getJSONSubContentBody("'+param+'")>'
				+subcontent[i].paragraphText+'</a><br />');
			}
		});
		return subsection;
	});	
}

//This function is responsible for building the Menu/content Section on the left
//of the page
function setMenuContent(){
	
	var prologueMenuJSON = null;
	var indent = '&nbsp;&nbsp;&nbsp;&nbsp';
	var param;
	var apostolicSection = [];
	var prologueSection = [];
	var part1 = [];
	var part2 = [];
	var part3 = [];
	var part4 = [];
	var apolosticName;
	var prologueName;
	var partOneName;
	var partTwoName;
	var partThreeName;
	var partFourName;
	
	setSafeToPaginate(false);
	prologueMenuJSON = getJSONSectionOrChap();//.filter(function(v){return v!=='';});
	
	for(var i=0; i< prologueMenuJSON.length; i++){
		param ='part='+prologueMenuJSON[i].partNumber;
		param+='&sec='+prologueMenuJSON[i].sectionNumber;
		param+='&chap='+prologueMenuJSON[i].chapterNumber;
		param+='&art='+prologueMenuJSON[i].articleNumber;
		param+='&parasec='+prologueMenuJSON[i].paragraphSectionNumber;
		param+='&subsec='+prologueMenuJSON[i].subsectionNumber;
		param+='&hdr='+prologueMenuJSON[i].headerNumber;
		param+='&par='+prologueMenuJSON[i].paragraphNumber;
		param+='&paratype='+prologueMenuJSON[i].paragraphType;
		
	//Set the content part names here 
	  if(prologueMenuJSON[i].partNumber == -2 && prologueMenuJSON[i].paragraphType == 1)
	  { 
		  apolosticName =  prologueMenuJSON[i].paragraphText;
	  }else if (prologueMenuJSON[i].partNumber == -1 && prologueMenuJSON[i].paragraphType == 1){
		  prologueName =  prologueMenuJSON[i].paragraphText;
	  }else if (prologueMenuJSON[i].partNumber == 1 && prologueMenuJSON[i].paragraphType == 1){
		  partOneName =  prologueMenuJSON[i].paragraphText;
	  }else if (prologueMenuJSON[i].partNumber == 2 && prologueMenuJSON[i].paragraphType == 1){
		  partTwoName =  prologueMenuJSON[i].paragraphText;
	  }else if (prologueMenuJSON[i].partNumber == 3 && prologueMenuJSON[i].paragraphType == 1){
		  partThreeName =  prologueMenuJSON[i].paragraphText;
	  }else if (prologueMenuJSON[i].partNumber == 4 && prologueMenuJSON[i].paragraphType == 1){
		  partFourName =  prologueMenuJSON[i].paragraphText;
	  }
		
	  if(prologueMenuJSON[i].partNumber == 1 && prologueMenuJSON[i].paragraphType != 1){
		  
		  //Set the content section, subsection here 
		   if((prologueMenuJSON[i].sectionNumber != 0 
				   && prologueMenuJSON[i].chapterNumber == 0) || 
				   (prologueMenuJSON[i].partNumber != 0 && prologueMenuJSON[i].sectionNumber == 0)){ 
			   part1.push('<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }else{
			   part1.push(indent+'<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }
	  }else if(prologueMenuJSON[i].partNumber == 2 && prologueMenuJSON[i].paragraphType != 1){
		  if((prologueMenuJSON[i].sectionNumber != 0 
				   && prologueMenuJSON[i].chapterNumber == 0) || (prologueMenuJSON[i].partNumber != 0 
			       && prologueMenuJSON[i].sectionNumber == 0)){ 
			   part2.push('<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }else{
			   part2.push(indent+'<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }
	  }else if(prologueMenuJSON[i].partNumber == 3 && prologueMenuJSON[i].paragraphType != 1){
		  if((prologueMenuJSON[i].sectionNumber != 0 
				   && prologueMenuJSON[i].chapterNumber == 0) || (prologueMenuJSON[i].partNumber != 0 
				   && prologueMenuJSON[i].sectionNumber == 0)){ 
			   part3.push('<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }else{
			   part3.push(indent+'<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }
	  }else if(prologueMenuJSON[i].partNumber == 4 && prologueMenuJSON[i].paragraphType != 1){
		  if((prologueMenuJSON[i].sectionNumber != 0 
				   && prologueMenuJSON[i].chapterNumber == 0)|| (prologueMenuJSON[i].partNumber != 0 
				   && prologueMenuJSON[i].sectionNumber == 0)){ 
			   part4.push('<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }else{
			   part4.push(indent+'<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					     +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }
	  }else if(prologueMenuJSON[i].partNumber == -1 && prologueMenuJSON[i].paragraphType != 1){
		  if((prologueMenuJSON[i].sectionNumber != 0 
				   && prologueMenuJSON[i].chapterNumber == 0) || (prologueMenuJSON[i].partNumber != 0 
				   && prologueMenuJSON[i].sectionNumber == 0)){ 
			  prologueSection.push('<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					    +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }else{
			   prologueSection.push(indent+'<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					    +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }
	  }else if(prologueMenuJSON[i].partNumber == -2 && prologueMenuJSON[i].paragraphType != 1){
		  if((prologueMenuJSON[i].sectionNumber != 0 
				   && prologueMenuJSON[i].chapterNumber == 0) || (prologueMenuJSON[i].partNumber != 0 
				   && prologueMenuJSON[i].sectionNumber == 0)){ 
			  apostolicSection.push('<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					    +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }else{
			   apostolicSection.push(indent+'<a href="#" onClick=javaScript:getSubContent("'+param+'");return false>'
					   +prologueMenuJSON[i].paragraphText+'</a>'+'<br />');
		   }
	  }
		  
	  }  
//create the content section DOM here
	
	document.getElementById("apostolic").innerHTML = apolosticName;
	document.getElementById("prologue").innerHTML = prologueName;
	document.getElementById("partOne").innerHTML= partOneName;
	document.getElementById("partTwo").innerHTML = partTwoName;
	document.getElementById("partThree").innerHTML = partThreeName;
	document.getElementById("partFour").innerHTML = partFourName;

	$('#collapseThreeThree').append(part1);
	$('#collapseFourFour').append(part2);
	$('#collapseFiveFive').append(part3);
	$('#collapseSixSix').append(part4);
	$('#collapseOneOne').append(apostolicSection);
	$('#collapseTwoTwo').append(prologueSection);

	$('#collapseOneOne, #collapseTwoTwo').css('display', 'none');
	$('#collapseOne,#collapseTwo').on('show', function(event) {
    	event.preventDefault();
	});
	
	if($('div#leadbody').empty()){
		getSubContent("part=-1&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}

	document.getElementById("apostolic").onclick = function() {
		getSubContent("part=-2&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}
	document.getElementById("prologue").onclick = function() {
		getSubContent("part=-1&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}
	document.getElementById("partOne").onclick = function() {
		getSubContent("part=1&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}
	document.getElementById("partTwo").onclick = function() {
		getSubContent("part=2&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}
	document.getElementById("partThree").onclick = function() {
		getSubContent("part=3&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}
	document.getElementById("partFour").onclick = function() {
		getSubContent("part=4&sec=0&chap=0&art=0&parasec=0&subsec=0&hdr=0&par=0&paratype=1");
	}
}
//Gateway into the application.
function getJSONContent(){
	$(document).ready(function() {
		setMenuContent();
	});		
}

//Gets notes from the database
function getJSONNotes(){
	$.getJSON("getnotejson", function(data, success){
		
	});
}



//function that get's reference text
function getReferenceText(controlstring){
	 var notes = null;
	 var refText = '<b>CITED TEXT : </b><br /><br />';
	 var leadtitle = '<em><b>Footnote References :</em></b><br />';
	 
	$.getJSON("/catechismold/getreftextjson.action"+controlstring,function(data,status){
		clearContentArea();
		notes = data.notes;
		$('div.leadbody').append(notes[0].paragraphText+'<br /><br />');
		
		if(data.refText != null && data.refText !=''){
			refText += data.refText[0].reference;
		}else{
			refText+='Additional text not yet available.'
		}
		scrollTo(0,0);
		$('div.leadbody').append(refText);
		$('div.leadtitle').append(leadtitle);
	  });
}

//this function gets called when the page content area is cleared
function clearContentArea(){	
	$('div.leadtitle').empty();
	$('div.leadbody').empty();
	//$('div#paginateold').empty();
}


//This is a helper function to create pages in buildContent() function
function createPages(){
	text = "";
	for(var x=1; x<=numPages; x++){
		text += '<p class="selection" id="page-' + x + '"></p>';
	}	
	return text;
}

//this function supports the pagination plugin and affix the paragraphs that are toggled
//when pagination page button is depressed 
function buildContent(){ 
	if(numItems % itemsPerPage){
		numPages++;
	}
	$("div#leadbody").html(createPages());
	count = 0;
	page = 1;
	text = "";
	$.each(list, function(i,item){
		text += item + "<br>";
		count++;
		if(count == itemsPerPage){
			count = 0;
			$("#page-"+page).append(text);
			text = "";
			page++;
		}
		else if(page == numPages && count > 0 && i == numItems - 1){
			$("#page-"+page).append(text);
		}
	});
	scrollTo(0,0);
}


// this function does the pagination when the 
function paginate(pageNumber){

	var page="#page-"+pageNumber;
	$('.selection').hide();
	$(page).show();
	scrollTo(0,0);
}
// this function executes the search ajax call and return the results that will show
function getSearchResults2(){
    var searchResults;
	var phrase = document.getElementById("search").value;
	var e = document.getElementById("operator");
	var operator = e.options[e.selectedIndex].value;
	var param = '?phrase='+phrase+'&operator='+operator;
	var sectionParam;
	var counter=0;
	var message; 
	var text;
	var page;
	var mod;
	var resultArray = new Array;
	var resultArrayTracker = 0;
	var domPopulated = false;
	var tablePageLinks='<table id="pages" class="pages"><tbody><tr>';
	var pageDiv = document.getElementById('paginateold');
	setSafeToPaginate(false);
	clearContentArea();
	numItems = 0;
	numPages =0;
	
	//Only make a server call if the call is necessary.
	if(phrase == null || phrase == ''){
		clearContentArea();
		message = 'You must enter something in the search field';
	}else{
	//$('div.leadtitle').text(message);
	  	$.ajax({  
    			type: "GET",  
    			url: "/catechismold/searchjson.action"+param, 
    			dataType:'json',
    			asynch: false,
    			success: function(data) {
					searchResults = data.searchResults;
					message = 'Search results for "'+phrase+'" ';
					$.each(searchResults, function(i,v){
						counter++;
						numItems++;
						sectionParam ="part="+searchResults[i].partNumber; 
						sectionParam +="&sec="+searchResults[i].sectionNumber; 
						sectionParam +="&chap="+searchResults[i].chapterNumber; 
						sectionParam +="&art="+searchResults[i].articleNumber; 
						sectionParam +="&parasec="+searchResults[i].paragraphSectionNumber; 
						sectionParam +="&subsec="+searchResults[i].subsectionNumber; 
						sectionParam +="&hdr="+searchResults[i].headerNumber; 
						sectionParam +="&par="+searchResults[i].paragraphNumber; 
						sectionParam +="&paratype="+searchResults[i].paragraphType; 
						$('div.leadtitle').empty();	
						//text = ' class="selection" id="para'+counter+'"><a href="#" onClick=javaScript:getJSONSubContentBody("'+sectionParam+'"); return false>&nbsp;'+searchResults[i].title+'&nbsp;&nbsp;</a>';
						//text +='<br /><br />'+searchResults[i].paragraphText+'<br /><br /></p>';
						text='<a href="#" onClick=javaScript:getJSONSubContentBody("'+sectionParam+'"); return false>&nbsp;'+searchResults[i].title+'&nbsp;&nbsp;</a>';
						text +='<br /><br />'+searchResults[i].paragraphText+'<br /><br /></p>';	
						resultArray[i]=text;
						mod=counter;
						//message = 'Search results for "'+phrase+'" ';
						//message+=counter+' matching paragraphs found';
						
					    //$('div.leadtitle').text(message);
					});
					message+=counter+' matching paragraphs found';
					$('div.leadtitle').text(message);
					//return the array of items in the search and calculate the number of
					//pages that will need to be built based on the desired pages set.
					list = resultArray;
					numItems = list.length;
					numPages = Math.floor(numItems / itemsPerPage);
					buildContent();
					paginate(1);
					//checks if there is greater than one page returned from the search
					//Only then do we want to show the pagin plugin 
				    if(numPages > 1){
				    	setSafeToPaginate(true);
				    	if(safeToPaginate){
							buildPaginationBar();
						}
				    }
	  			}
			});
	  	}
	$('div.leadtitle').text(message);
	}
	    

// This function conforms to the pagination plugin it builds the paging bar in the DOM
function buildPaginationBar(){
	$(function() {
		$(selector).pagination({
	        items: numItems,
	        itemsOnPage: itemsPerPage,
	        cssStyle: 'light-theme',
					onPageClick: function(pageNumber){paginate(pageNumber);}
	    });
	});
	scrollTo(0,0);
}

//Only show pagination if there is a search and the search result yields more than 1 page
function setSafeToPaginate(searcgFlag){
	safeToPaginate = searcgFlag;
	if(!searcgFlag){
		$('div#selector').empty();
	}
}


//Get the note section from the database and update the DOM
function redirectResponsive(controlstring){
var param = null;
$.getJSON("/catechismold/getnote.action?"+controlstring,function(data,status){
	
	
	scrollTo(0,0);
	 var content = data.notes; 
		param ='?part='+content[0].partNumber;
		param+='&sec='+content[0].sectionNumber;
		param+='&chap='+content[0].chapterNumber;
		param+='&par='+content[0].paragraphNumber;
		param+='&fnote='+content[0].footnoteNumber;
	 	clearContentArea();
	 	setSafeToPaginate(false);
	 	
	 	$('div.leadtitle').append(content[0].title);
	 	$('div.leadbody').append(content[0].paragraphText+'<br /><br />');
	 	$('div.leadbody').append('['+'<a href="#" onClick=javaScript:getReferenceText("'+param+'"); return false>'+'View Referenced Text'+'</a>'+']');
 });
}