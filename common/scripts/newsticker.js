/*Function.prototype.bind = function(obj) {
    var _method = this;
    return function() {
        return _method.apply(obj, arguments);
    };    
}
function getstyle(elem, prop) {
	if(document.defaultView) {
		return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
	}
	else if(elem.currentStyle) {
		var prop = prop.replace(/-(\w)/gi, function($0,$1) {
			return $1.toUpperCase();
		});
		return elem.currentStyle[prop];
	}
	else return null;
}

var ttt = [];
function $(id) { 
    var $ =  (typeof id  =="string") ? document.getElementById(id) : id;
    $.start ={};
    $.start = function() {
        var left = getstyle($,"left");
	    var top =  getstyle($,"top");	 
	    $.start.left = (left=="auto") ? 0 : parseInt(left);
	    $.start.top = (top=="auto") ? 0 : parseInt(top);
    }
    $.stop = function(){
		for (i in ttt) {
			clearTimeout(ttt[i]);
		}
    };
    $.move = function(settings,callbk) {
		var _this = $;
		var left = getstyle(this,"left");
		var top =  getstyle(this,"top");
	 	$.start.left = (left=="auto") ? 0 : parseInt(left);
		$.start.top = (top=="auto") ? 0 : parseInt(top);
	    if (settings.to.top == _this.start.top) { // x 
            var descend = (settings.to.left>_this.start.left) ? false : true;     
			var s = Math.min(_this.start.left,settings.to.left); 
			var d = Math.max(_this.start.left,settings.to.left); 
			_this.speed = (d -s)/settings.delay;
			for (i = s; i <= d; i++) { 
				(function(j) { 
				    var delay = (descend==true) ? parseInt((d-j)*settings.delay/(d - s)) : parseInt((j-s)*settings.delay/(d - s));
                    ttt[i] = setTimeout(function() { 
                    _this.style.left = j+"px";     
                    //document.getElementById("to").innerHTML = ", style.left: "+  j+"px";                
                        if (descend==false&&j==d&&callbk!=undefined) {callbk.call(_this);} 
                        else if (descend==true&&callbk!=undefined&&j==s) {callbk.call(_this);} 
                    },delay); 
                })(i); 
            } 
        } 
		else if (settings.to.left == _this.start.left) {  // y 
			var descend = (settings.to.top>_this.start.top) ? false : true;
			var s = Math.min(_this.start.top,settings.to.top);
			var d = Math.max(_this.start.top,settings.to.top);
              //var el = document.getElementById("re");
            for (i = s; i <= d; i++) {
				(function(j) {
					var delay = (descend==true) ? (d-j)*settings.delay/(d - s) : (j-s)*settings.delay/(d - s); 
					_this.t = setTimeout(function() {  
                        _this.style.top = j+"px";
                        if (descend==false&&j==d&&callbk!=undefined) {
							callbk.call(_this);
                        }
						else if (descend==true&&callbk!=undefined&&j==s) {
							callbk.call(_this);
                        }
                    },delay);
				})(i); 
            }
		}
    	else {
			var descend = (settings.to.left>_this.start.left) ? false : true;
			var s = Math.min(_this.start.left,settings.to.left);
			var d = Math.max(_this.start.left,settings.to.left);
			var k = (settings.to.top - _this.start.top)/(settings.to.left - _this.start.left);
			var b = settings.to.top  - k*settings.to.left;
            for (i = s; i <= d; i++) {
				(function(j) {
                    var delay = (descend==true) ? (d-j)*settings.delay/(d - s) : (j-s)*settings.delay/(d - s); 
						setTimeout(function() {  
							_this.style.left = j+"px";
							_this.style.top = k*j+b+"px";
							if (descend==false&&j==d&&callbk!=undefined) {callbk.call(_this);}
							else if (descend==true&&callbk!=undefined&&j==s) {callbk.call(_this);}
                         },delay);
			    })(i); 
            }
		}
	};
    return $;  
}
Function.prototype.bind = function(obj) {	
    var _method = this;
    return function() {
        return _method.apply(obj, arguments);
    };    
} 
function ticler1(){
    $(ul).move({delay:50000,to:{left:-1000,top:0}},function(){
         this.style.left = 600+"px";
         $(this).stop();
    });

}
//ticler1.repeat(5000);

var t;
Function.prototype.repeat = function(del) {
	var _this = this;
	(function() { 
		t = setInterval(_this,del);
	})();
}

function ticker(id){
	this.id;
	this.ul = document.getElementById(id);
	this.lis = this.ul.getElementsByTagName("LI");
	this.lis[0].style.paddingLeft = "0px";
	this.len = this.lis.length;
	this.width = 0;
	for(i=0;i<this.len;i++) {
		var dd = this.lis[i].offsetWidth;
		this.width +=this.lis[i].offsetWidth;
	}
	this.ul.style.width = this.width+"px";
	this.left = this.ul.parentNode.offsetWidth;
	this.ul.style.left = this.left+"px";
	this.t=0;
	this.to =0;
	this.delay =150000;
	this.speed = (this.left+this.width)/this.delay;
}

ticker.prototype = {
	_this: "",
	repeat: function(fn,del){
		var _this = this;
		(function() { 
		_this.t = setInterval(fn,del);
		})();
	},
	go: function(){
		_this = this;
		_stop = this.stop.bind(this);
		_too = this.too.bind(this);
		this.attach();
		clearInterval(this.t);
		_this.movee();
	},
	movee: function() {
		$(_this.ul).move({delay:_this.delay,to:{left:-_this.width,top:0}},function(){
			_this.ul.style.left = _this.left+"px";
			//$(_this.ul).stop();
		});

		_this.t =  setTimeout(_this.movee,_this.delay);  
	},
	too: function(){
		left = _this.width;
		delay = Math.abs(parseInt((parseInt(_this.ul.style.left)+left)/_this.speed));
		$(_this.ul).move({delay:delay,to:{left:-left,top:0}},function(){
			_this.ul.style.left = _this.left+"px";
			_this.movee();
        });    
	},
	attach:function(){
		this.ul.onmouseover = function(){
		$(this).stop();
		_stop();
		};
		this.ul.onmouseout = function(){
			if (_this.t!=0) return;
			_stop();
			_too();
		}
	},

	stop:function(){
		clearTimeout(this.t);
		this.t = 0;
	}
}

var ul = document.getElementById("nt");

var tk1 = new ticker("nt");
tk1.go();*/

$(function()
{
	$(".modern-ticker").modernTicker({
		effect:"scroll",
		scrollType:"continuous",
		scrollStart:"inside",
		scrollInterval:20,
		transitionTime:500,
		autoplay:true
	});
	
/*$(function()
{

    var ticker = function()
    {
        setTimeout(function(){
            $('.newsticker li:first').animate( {marginRight: '-120px'}, 800, function()
            {
                $(this).detach().appendTo('.newsticker').removeAttr('style');
            });
            ticker();
        }, 4000);
    };
    ticker();
});*/