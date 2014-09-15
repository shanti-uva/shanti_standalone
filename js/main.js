
// *** NAVIGATION *** top drilldown menu
jQuery(function ($) {
  $( '#menu' ).multilevelpushmenu({
    menuWidth: 250,
    menuHeight: '32em', // this height is determined by tallest menu, Preferences
    mode: 'cover',
    direction: 'rtl',
    backItemIcon: 'fa fa-angle-left',
    groupIcon: 'fa fa-angle-right',
    collapsed: false
  });
  
  // --- align the text
  $('#menu ul>li, #menu h2').css('text-align','left');
  $('#menu ul>li.levelHolderClass.rtl').css('text-align','right');

	$('.collections button').addClass('close');
  // --- close the menu on outside click except button
  $('.menu-toggle').click( function(event){
      event.stopPropagation();
      $('#menu').toggle(50);
      $('.menu-toggle').toggleClass('show-topmenu');
      $('.collections').slideUp(200);
      $('.menu-exploretoggle').removeClass('show-topmenu');
   });

	// --- close the menu on outside click except button
  $('.menu-exploretoggle').click( function(event){
      event.stopPropagation();
      $('.collections').slideUp();
  });
    
  $(document).click( function(){
      $('.menu-toggle').removeClass('show-topmenu');
      $('#menu').hide(100);
  });  
        
});




// *** CONTENT *** accordion toggle
$.fn.accordionFx = function() {
    return this.each(function(i, accordion) {
        $(".accordion-toggle", accordion).click(function(ev) {
            var link = ev.target;
            var header = $(link).closest(".panel-heading");
            var chevState = $("i.glyphicon", header)
                .toggleClass('glyphicon-minus glyphicon-plus');
            $("i.glyphicon", accordion)
                .not(chevState)
                .removeClass("glyphicon-minus")
                .addClass("glyphicon-plus");
        });
    });
};

jQuery(function ($) {
	$('#accordion').accordionFx();
});


jQuery(function ($) {
	// *** CONTENT *** hide responsive column for resources
  $('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active');
  });
});

jQuery(function () {
  // show-hide the IE message for older browsers
  $('.progressive').delay( 2000 ).slideDown( 400 ).delay( 5000 ).slideUp( 400 );
});


// *** SEARCH *** Select-Form & iCheck form graphics
jQuery(function ($) {
  $("input[type='checkbox'], input[type='radio']").each(function () {
      var self = $(this),
          label = self.next(),
          label_text = label.text();

      label.remove();
      self.iCheck({
          checkboxClass: "icheckbox_minimal-red",
          radioClass: "iradio_minimal-red",
          insert: "<div class='icheck_line-icon'></div>" + label_text
      });
  });
});







 

// *** CONTENT *** top link
jQuery(function ($) {
  var offset = 420;
  var duration = 500;
  jQuery(window).scroll(function() {
      if (jQuery(this).scrollTop() > offset) {
          jQuery('.back-to-top').fadeIn(duration);
      } else {
          jQuery('.back-to-top').fadeOut(duration);
      }
  });
  jQuery('.back-to-top').click(function(event) {
      event.preventDefault();
      jQuery('html, body').animate({scrollTop: 0}, duration);
      return false;
  })
});


/**
jQuery(function ($) {
    $(".dataTables_filter > label").text(function () {
    		return $(this).text().replace("Search:", "Filter:"); 
		});​​​​​
});
**/


// *** SEARCH *** initiate sliding container, toggle collections & search options
jQuery(function ($) {

  $("#menu-main").buildMbExtruder({
      positionFixed: false,
      position: "right",
      width: 280,      
      hidePanelsOnClose:false,
      accordionPanels:false,
      onExtOpen:function(){ $(".menu-main").metisMenu({ toggle: false });  },
      onExtContentLoad:function(){ 
      
      	$("input[type='radio']").each(function () {
					var self = $(this),
          label = self.next(),
          label_text = label.text();
					label.remove();
					self.iCheck({
	          // checkboxClass: "icheckbox_minimal-red",
	          radioClass: "iradio_minimal-red",
	          insert: "<div class='icheck_line-icon'></div>" + label_text
					});
				});
      	
      },
      onExtClose:function(){},
      top: 0
  }); 
  $("#menu-collections").buildMbExtruder({
      positionFixed: false,
      position: "right",
      width:280, // width is set in two places, here and the css
      hidePanelsOnClose:false,
      accordionPanels:false,
      onExtOpen:function(){ $(".menu-main").metisMenu({ toggle: false }); },
      onExtContentLoad:function(){  },
      onExtClose:function(){},
      top: 0
  });	
	// this is for the responsive button
  $(".shanti-searchtoggle").click(function () {   
      if($("#kmaps-search.extruder").hasClass("isOpened")){   
        $("#kmaps-search").closeMbExtruder();
        $(".shanti-searchtoggle").removeClass("show-topmenu");        
      } else {      
        $("#menu-main").closeMbExtruder();
        $("#menu-collections").closeMbExtruder();
        $("#kmaps-search").openMbExtruder();
        $(".shanti-searchtoggle").addClass("show-topmenu");
        $(".menu-maintoggle,.menu-exploretoggle").removeClass("show-topmenu");
        // $("#menu-main").load("./menus-ajax.html");        
        // $(".menu-collections-wrap .accordion-toggle").addClass("collapsed");
        // $(".menu-collections-wrap .panel-collapse").removeClass("in").css('height','0');
        return false;
      }
  });   
  $('body').on('click','.menu-maintoggle',function(){   
      if($("#menu-main.extruder").hasClass("isOpened")){    
        $("#menu-main").closeMbExtruder();
        $(".menu-maintoggle").removeClass("show-topmenu");     
      } else {     
        $("#menu-main").openMbExtruder();
        $("#kmaps-search").closeMbExtruder();
        $("#menu-collections").closeMbExtruder();
        $(".menu-commons, .menu-preferences, .menu-collections").css('display','block');
        
        $(".menu-commons").addClass("active");
        
        $(".menu-collections").removeClass("active");
        $(".menu-collections > ul").removeClass("in");
        
        // $("#menu-main").load("/menus-ajax.html #menu-accordion");
        $(".menu-maintoggle").addClass("show-topmenu");
        $(".menu-exploretoggle, .shanti-searchtoggle").removeClass("show-topmenu");
        return false;
      }
  });
  $(".menu-exploretoggle").click(function () {   
      if($("#menu-collections.extruder").hasClass("isOpened")){   
        
        $("#menu-collections").closeMbExtruder();
        $(".menu-exploretoggle").removeClass("show-topmenu");
        // $(".bottom-trim").remove();                
      } else {        
        $(".menu-commons, .menu-preferences").css('display','none');
        $(".menu-collections").css('display','block');
        
        $(".menu-collections").addClass("active");
        $(".menu-collections > ul").addClass("in");
        
        $("#menu-collections").openMbExtruder();
        $("#menu-main").closeMbExtruder();        
        $("#kmaps-search").closeMbExtruder();
        
        $(".menu-exploretoggle").addClass("show-topmenu");  
        $(".menu-maintoggle,.shanti-searchtoggle").removeClass("show-topmenu");    
        
        // $(".menu-collections").find("ul").append("<li class='bottom-trim'></li>");  
        return false;
      }
  });   
   
	// --- ajax call for collections list
	$( "#kmaps-collections").load( "/sites/all/themes/shanti_theme/js/menus/menu-ajax.php .menu-collections > ul");  	
  $('body').on('click','.explore>a, .collections button',function(){
       $(".collections").slideToggle(200);      
  });
  
  
  if($(".breadcrumb > li > a:contains('Subjects')")) {
	  $(".breadcrumb li a").find("i").css('background','#dc3c47');
  }
  if($(".breadcrumb > li > a:contains('Places')")) {
	  $(".breadcrumb li a").find("i").css('background','#4CA6FB');
  } 
    

	if($("body").hasClass("page-subjects")) {
		$(".feature-group").css('display','none');
		$(".select-type").css('display','block');
	}
	if($("body").hasClass("page-places")) {
		$(".feature-group").css('display','block');
		$(".select-type").css('display','none');
	}
});