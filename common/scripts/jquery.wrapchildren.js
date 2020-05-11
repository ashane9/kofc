(function($){

   $.fn.wrapChildren = function(options) {

    var options = $.extend({
                              childElem : undefined,
                              sets : 1,
                              wrapper : 'div'
                            }, options || {});
    if (options.childElem === undefined) return this;

 return this.each(function() {
  var elems = $(this).children(options.childElem);
  var arr = [];

  elems.each(function(i,value) {
    arr.push(value);
    if (((i + 1) % options.sets === 0) || (i === elems.length -1))
   {
     var set = $(arr);
     arr = [];
     set.wrapAll($("<" + options.wrapper + ">"));
   }
  });
    });

  }

})(jQuery);