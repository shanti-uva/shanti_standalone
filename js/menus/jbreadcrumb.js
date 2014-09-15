/* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ */
jQuery.easing.jswing=jQuery.easing.swing; jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a+c: b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,a,c,b,d){return-b*Math.cos(a/ d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return 0==a?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){return 0==a?c:a==d?c+b:1>(a/=d/2)?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c},easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)* a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){return 1>(a/=d/2)?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(1==(a/=d))return c+b;f||(f=.3*d);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin(2*(a*d-e)*Math.PI/f))+c},easeOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(1== (a/=d))return c+b;f||(f=.3*d);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin(2*(a*d-e)*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(2==(a/=d/2))return c+b;f||(f=.3*d*1.5);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return 1>a?-.5*g*Math.pow(2,10*(a-=1))*Math.sin(2*(a*d-e)*Math.PI/f)+c:g*Math.pow(2,-10*(a-=1))*Math.sin(2*(a*d-e)*Math.PI/f)*.5+b+c},easeInBack:function(e,a,c,b,d,f){void 0==f&& (f=1.70158);return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){void 0==f&&(f=1.70158);return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){void 0==f&&(f=1.70158);return 1>(a/=d/2)?b/2*a*a*(((f*=1.525)+1)*a-f)+c:b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=d)<1/2.75?7.5625*b*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+.75)+c:a<2.5/2.75?b* (7.5625*(a-=2.25/2.75)*a+.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+.984375)+c},easeInOutBounce:function(e,a,c,b,d){return a<d/2?.5*jQuery.easing.easeInBounce(e,2*a,0,b,d)+c:.5*jQuery.easing.easeOutBounce(e,2*a-d,0,b,d)+.5*b+c}});

/**
 * jBreadCrumbCustom 1.0 by Nojan A. (nojanarabi@gmail.com) - based on jBreadCrumb script 1.1 by Jason Roy
 * - MIT Licensed: http://www.opensource.org/licenses/mit-license.php
 **/
 
(function($)
{

    /* Private variables */
    var _options = {};
    var _container = {};
    var _breadCrumbElements = {};
    var _originalContainerWidth = '';
    var _initialCollapsingCounter = 0;
    var _breadcrumbsResizingTimeout = '';
    
    /* Public functions */
    jQuery.fn.jBreadCrumbCustom = function(options)
    {
        _options = $.extend({}, $.fn.jBreadCrumbCustom.defaults, options);
        
        return this.each(function()
        {
            _container = $(this);
            setupBreadCrumb();
        });
    };
    
    /* Private functions */
    function setupBreadCrumb()
    {
		/* Check if easing plugin exists. If it doesn't, use "swing" */
		/* if(typeof(jQuery.easing) !== 'object')
		{
			_options.easing = 'swing';
		} */

        /* The reference object containing all of the breadcrumb elements */
        _breadCrumbElements = jQuery(_container).find('li');
        
        /* If the breadcrumb contains nothing, don't do anything */
        if (_breadCrumbElements.length > 0) 
        {
        	compressBreadCrumb();

        	/* Window resize listener */
        	$(window).resize(function(event) {
        		if($(window).width() < 500) {
        			unwind_all();
        		} else {
        			if(typeof(_breadcrumbsResizingTimeout) != 'undefined') {
	        			window.clearTimeout(_breadcrumbsResizingTimeout);
	        		}
	        		_breadcrumbsResizingTimeout = setTimeout(function(event) {
		        		setupBreadCrumb();
	        		}, 300);
        		}
        	});
		};
    };
    
    /* check to see if it needs compressing */
    function needsCompressing()
    {

    	unwind_all();

    	var firstElement = jQuery(_breadCrumbElements[0]);
    	var lastElement = jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]);

        lastElement.addClass('last');
        firstElement.addClass('first');

        var firstElementLeft = parseInt(firstElement.position().left);
        var lastElementRight = parseInt(lastElement.position().left) + parseInt(lastElement.width());

        _originalContainerWidth = lastElementRight - firstElementLeft;

        /* If elements width is more than their container's width then compress! */
        if( (lastElementRight - firstElementLeft) > _container.width() )
        {
        	var startingFrom = _options.startingFrom-1-1;
        	var listWidth = lastElementRight - firstElementLeft;

        	returningArray = [];

        	while(listWidth > _container.width()) {
        		startingFrom++;
				listWidth = listWidth - jQuery(_breadCrumbElements[startingFrom]).width() + 10;
				returningArray.push(startingFrom);
        	}

            return returningArray;
        }
        else
        {
        	return false;
        };
    }

    function compressBreadCrumb()
    {

	    unwind_all();

		if($(window).width() >= 500)
		{ /* In case window width is more than or equal to 500px */
			
			if(needsCompressing !== false)
			{
	        	
	        	itemsToRemove = needsCompressing();
	        
		        /* We compress only elements determined by the formula setting below */
		        $(_breadCrumbElements).each(function(i, listElement)
		        {

		            if (in_array(i, itemsToRemove)) 
		            {
		                jQuery(listElement).wrapInner('<span class="wholegrain"></span>');

		                var options = 
		                {
		                    id: i,
		                    width: jQuery(listElement).width(),
		                    isAnimating: false,
		                    element: jQuery(listElement).find('span.wholegrain')
		                };

		                jQuery(listElement).bind('mouseover', options, expandBreadCrumb).bind('mouseout', options, shrinkBreadCrumb);
		                jQuery(listElement).find('>*').unbind('mouseover', expandBreadCrumb).unbind('mouseout', shrinkBreadCrumb);

		                // Collapsing item (Each step with more delay to create the order effect)
		                listElement.autoInterval = setInterval(function()
		                {
		                    clearInterval(listElement.autoInterval);
		                    jQuery(listElement).find('span.wholegrain').stop().animate(
		                    {
		                        width: _options.collapsedWidth
		                    }, _options.animationDuration, _options.easing);
		                }, (120 * (++_initialCollapsingCounter)));
		                // Collapsing item (Each step with more delay to create the order effect)
		            }
		        });
				_initialCollapsingCounter = 0;
	        }

		}
    };
    
    function unwind_all() {
    	$(_breadCrumbElements).each(function(i, listElement)
	    {
	    	jQuery(listElement).unbind('mouseover').unbind('mouseout');
			jQuery(listElement).find('span.wholegrain').animate(
	        {
	            width: 'auto'
	        }, 0, _options.easing);
        });
    }

    function expandBreadCrumb(e)
    {
        var elementID = e.data.id;
        var originalWidth = e.data.width;
        jQuery(e.data.element).stop();
        jQuery(e.data.element).animate(
        {
            width: originalWidth
        }, 
        {
            duration: _options.animationDuration,
            easing: _options.easing,
            queue: false
        });
        return false;
    };
    
    function shrinkBreadCrumb(e)
    {
        var elementID = e.data.id;
        jQuery(e.data.element).stop();
        jQuery(e.data.element).animate(
        {
            width: _options.collapsedWidth
        }, 
        {
            duration: _options.animationDuration,
            easing: _options.easing,
            queue: false
        });
        return false;
    };

    function in_array(needle, haystack, argStrict) {
	  var key = '',
	    strict = !! argStrict;
	  if (strict) {
	    for (key in haystack) {
	      if (haystack[key] === needle) {
	        return true;
	      }
	    }
	  } else {
	    for (key in haystack) {
	      if (haystack[key] == needle) {
	        return true;
	      }
	    }
	  }
	  return false;
	}

    /* Public global variables */
    jQuery.fn.jBreadCrumbCustom.defaults = 
    {
        animationDuration: 500,
        collapsedWidth: 10,
        easing: 'easeOutQuad',
        startingFrom: 2
    };
    
})(jQuery);