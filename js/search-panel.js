var Settings = {
     type: location.pathname.indexOf('subjects') !== -1 ? "subjects" : "places",
     baseUrl: location.pathname.indexOf('subjects') !== -1 ? "http://subjects.kmaps.virginia.edu" : "http://places.kmaps.virginia.edu",
     mmsUrl: "http://dev-mms.thlib.org",
     placesUrl: "http://places.kmaps.virginia.edu",
     subjectsUrl: "http://subjects.kmaps.virginia.edu",
     placesPath: location.origin + location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/places',
     subjectsPath: location.origin + location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/subjects',
     mediabaseURL: "http://mediabase.drupal-dev.shanti.virginia.edu"
}

// *** SEARCH *** initiate sliding container
jQuery(function ($) {
  // --- prevent flash onload
  $(".input-section, .view-section, .view-section .nav-tabs>li>a").css("display","block");

  $("#kmaps-search").buildMbExtruder({
      positionFixed: false,
      position: "right",
      closeOnExternalClick:false,
      closeOnClick:false,
      width: 295, // width is set in two places, here and the css
      top: 0
  });

});



jQuery(function($) {
	 // call bootstrap-select
  $(".advanced-view .selectpicker").selectpicker({ // see other selectpicker settings in related html markup in search panel
			iconBase: 'icon',
	    noneSelectedText: 'SEARCH RESOURCES',
	    noneResultsText: 'No results match',
	    countSelectedText: 'Searching <em>({0})</em> Resource Types'
  });
  // $(".selectpicker").selectpicker("val", ['Essays','Photos']);
  // $('.selectpicker').selectpicker('selectAll');
  // --- set custom shanti resource icons
	$(".advanced-view .selectpicker li a").find("i:eq(1)").removeClass("icon");
	$(".advanced-view .selectpicker li a").find("i:eq(1)").addClass("glyphicon");		
	
	$(".advanced-view .selectpicker>li>a i.check-mark").css('display','inline-block');
	
		
  // --- advanced search toggle icons, open/close, view change height
  $(".advanced-link").click(function () {
      $(this).toggleClass("show-advanced",'fast');
      $(".advanced-view").slideToggle('fast');
      $(".advanced-view").toggleClass("show-options");
      $(".view-wrap").toggleClass("short-wrap"); // ----- toggle class for managing view-section height      
      kmaps_placesHeight();
      kmaps_subjectsHeight();
  }); 
  
  // $("advanced-view").css('height','275px'); 
  
// *** SEARCH *** adapt search panel height to viewport
  var height = $(window).height();
  var kmapsrch = (height) - 80;  
  
  function kmaps_placesHeight() {
  // *** places search
    var places_viewHeight = (height) -  211;
    var places_comboHeight = (places_viewHeight) - 207;        
    kmapsrch = parseInt(kmapsrch) + 'px';
    $("#kmaps-search").find(".text").css('height',kmapsrch);
    places_viewHeight = parseInt(places_viewHeight) + 'px';
    places_comboHeight = parseInt(places_comboHeight) + 'px';
    $(".page-places .view-wrap").css('height', places_viewHeight);
		$(".page-places .view-wrap.short-wrap").css('height', places_comboHeight);           
  } 
  function kmaps_subjectsHeight() {  
  // *** subjects search    
    var subjects_viewHeight = (height) -  211;
    var subjects_comboHeight = (subjects_viewHeight) - 126;        
    kmapsrch = parseInt(kmapsrch) + 'px';
    $("#kmaps-search").find(".text").css('height',kmapsrch);    
    subjects_viewHeight = parseInt(subjects_viewHeight) + 'px';
    subjects_comboHeight = parseInt(subjects_comboHeight) + 'px';
    $(".page-subjects .view-wrap").css('height', subjects_viewHeight);
		$(".page-subjects .view-wrap.short-wrap").css('height', subjects_comboHeight);          
  }    
	 // --- autoadjust the height of search panel, call function TEMP placed in bottom of equalheights js
    kmaps_placesHeight();
    $(window).bind('load orientationchange resize', kmaps_placesHeight);
	 // --- autoadjust the height of search panel, call function TEMP placed in bottom of equalheights js
    kmaps_subjectsHeight();
    $(window).bind('load orientationchange resize', kmaps_subjectsHeight);
});

// *** SEARCH *** corrections for widths
jQuery(function($) {

  $("#kmaps-search div.text").resizable({ handles: "w",
          resize: function (event, ui) {
              $('.title-field').trunk8({ tooltip:false });
          }
      }); // --- initiate jquery resize

  function checkWidth() {
  var panelWidth = $(".text").width();

    if( panelWidth > 275 ) {
        $(".extruder-content").css("width","100%");
      } else
    if( panelWidth <= 275 ) {
        $(".extruder-content").css("width","100% !important");
      }
  }

  // Execute on load
  checkWidth();
  // Bind event listener
  $(".extruder-content").resize(checkWidth);
  // show-hide resource side-column
  $("button.view-resources").click( function() {
          $(this).toggleClass( "show",'fast' );
   });
  
});





// *** SEARCH *** toggle button
jQuery(function($) {
  if (!$(".extruder.right").hasClass("isOpened")) {
        $(".flap").click( function() {
          $(".extruder .text").css("width","100%");
        });
          // styles inline for now, forces
        $(".flap").prepend("<span style='font-size:21px; position:absolute; left:17px; top:12px; z-index:10;'><i class='icon shanticon-search'></i></span>");
        $(".flap").addClass("on-flap");
  }

  $(".extruder.right .flap").hover( function() {
      $(this).addClass('on-hover');
      },
        function () {
      $(this).removeClass('on-hover');
      }
  );
});

function decorateElementWithPopover(elem, node) {
    jQuery(elem).attr('rel', 'popover');
    var path = "<div class='kmap-path'>/" + $.makeArray(node.getParentList(false, true).map(function (x) {
        return x.title;
    })).join("/") + "</div>";
    var caption = ((node.data.caption)?node.data.caption:"");
    var kmapid = "<span class='kmapid-display'>" + node.key + "</span>";
    var lazycounts = "<div class='counts-display'>...</div>";
    jQuery(elem).popover({
            html: true,
            content: function() {
                return path + caption + "<div class='info-wrap' id='infowrap" + node.key +"'>" + lazycounts + "</div>";
            },
            title: function() {
                return node.title + kmapid;
            }
        }
    );
    jQuery(elem).on('shown.bs.popover', function(x) {
    		$(".popover").addClass("searchPop"); // target css styles on search tree popups
        //  var counts = jQuery(elem.parentNode||elem[0].parentNode).find('.info-wrap .counts-display');
        var counts = $("#infowrap" + node.key + " .counts-display");
        // console.log(counts.html());
        // alert(node.key + " --- " + counts);
        $.ajax({
            type: "GET",
            url: Settings.baseUrl + "/features/" + node.key + ".xml",
            dataType: "xml",
            timeout: 30000,
            beforeSend: function(){
                counts.html("<span class='assoc-resources-loading'>loading...</span>");
            },
            error: function(e) {
                counts.html("<i class='glyphicon glyphicon-warning-sign' title='"+ e.statusText);
            },
            success: function (xml) {
                // force the counts to be evaluated as numbers.
                var related_count = Number($(xml).find('related_feature_count').text());
                var description_count = Number($(xml).find('description_count').text());
                var place_count = Number($(xml).find('place_count').text());
                var picture_count = Number($(xml).find('picture_count').text());
                var video_count = Number($(xml).find('video_count').text());
                var document_count = Number($(xml).find('document_count').text());

                if (related_count) counts.html("<span class='associated'><i class='icon shanticon-sources'></i><span class='badge' + (related_count)?' alert-success':''>" + related_count + "</span></span>");
                if (description_count) counts.append("<span class='associated'><i class='icon shanticon-essays'></i><span class='badge' + (description_count)?' alert-success':'>" + description_count + "</span></span>");
                if (place_count) counts.append("<span class='associated'><i class='icon shanticon-places'></i><span class='badge' + (place_count)?' alert-success':'>" + place_count + "</span></span>");
                if (picture_count) counts.append("<span class='associated'><i class='icon shanticon-photos'></i><span class='badge' + (picture_count)?' alert-success':'>" + picture_count + "</span></span>");
                if (video_count) counts.append("<span class='associated'><i class='icon shanticon-audio-video'></i><span class='badge' + (video_count)?' alert-success':'>" + video_count + "</span></span>");
                if (document_count) counts.append("<span class='associated'><i class='icon shanticon-texts'></i><span class='badge' + (document_count)?' alert-success':'>" + document_count + "</span></span>");

            }
        });
    });
    return elem;
};

var searchUtil = {
    clearSearch: function() {
        if ($('#tree').fancytree('getActiveNode')) {
            $('#tree').fancytree('getActiveNode').setActive(false);
        }
        $('#tree').fancytree('getTree').clearFilter();
        $('#tree').fancytree("getRootNode").visit(function (node) {
            node.setExpanded(false);
        });
        $('table.table-results').dataTable().fnDestroy();




        $('div.listview div div.table-responsive table.table-results tr').not(':first').remove();
        $('table.table-results').dataTable();

        // "unwrap" the <mark>ed text
        $('span.fancytree-title').each(
            function () {
                $(this).text($(this).text());
            }
        );

    }
};

var notify = {
    warn: function (warnid, warnhtml) {
        var wonk = function () {
            if ($('div#' + warnid).length) {
                $('div#' + warnid).fadeIn();
            } else {
                jQuery('<div id="' + warnid + '" class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + warnhtml + '</div>').fadeIn().appendTo('#notification-wrapper');
            }
        }

        if ($('#notification-wrapper div#' + warnid).length) {
            $('#notification-wrapper div#' + warnid).fadeOut('slow', wonk);
        } else {
            wonk();
        }
    },

    clear: function (warnid) {

        if (warnid) {
            $('#notification-wrapper div#' + warnid).fadeOut('slow').remove()
        } else {
            $('#notification-wrapper div').fadeOut('slow').remove()
        }
    }
}

// *** SEARCH *** sliding panel
jQuery(function ($) {

    // search min length
    const SEARCH_MIN_LENGTH = 3;

    // set the popover defaults
    $.fn.popover.Constructor.DEFAULTS.trigger = 'hover';
    $.fn.popover.Constructor.DEFAULTS.placement = 'left';
    $.fn.popover.Constructor.DEFAULTS.html = true;
    $.fn.popover.Constructor.DEFAULTS.delay.hide = '5000';
    $.fn.popover.Constructor.DEFAULTS.container = 'body';


    $.fn.overlayMask = function (action) {
        var mask = this.find('.overlay-mask');

        // Create the required mask

        if (!mask.length) {
//            this.css({
//                position: 'relative'
//            });

            mask = $('<div class="overlay-mask"><div class="loading-container"><div class="loading"></div><div id="loading-text">Searching&#133;</div></div></div>');
            mask.css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0px',
                left: '0px',
                zIndex: 100,
                opacity: 9,
                backgroundColor: 'white'
            }).appendTo(this).fadeTo(0, 0.5).find('div').position( { my: 'center center', at: 'center center', of: '.overlay-mask' } )
        }

        // Act based on params

        if (!action || action === 'show') {
            mask.show();
        } else if (action === 'hide') {
            mask.hide();
        }

        return this;
    };


    /**
    // set the dataTable defaults
    $.extend( true, $.fn.dataTable.defaults, {
				"sScrollY": "300px",
				"sScrollX": "100%",
				"sScrollXInner": "150%",
				"bScrollCollapse": true,
				"bPaginate": false
        },
        
        "oPaginate": false,
        "bPaginate": false,
           
        "oLanguage": {
            "sSearch": "Filter:",
            "sEmptyTable": "No results.  Enter new search query above."
        }

        "fnDrawCallback": function() {
//            var dtable = $('table.table-results').dataTable();
//            if (dtable.fnSettings().fnRecordsDisplay() <= dtable.fnSettings()._iDisplayLength) {
//                $('div.dataTables_paginate').hide();
//            } else {
//                $('.dataTables_paginate').show();
//            }
            $('.title-field').trunk8({ tooltip:false }); // .popover();
        },
        "fnInitComplete": function() {
            $('.title-field').trunk8({ tooltip:false }); // .popover();
        }
        
    });

    **/

    $("#tree").fancytree({
      extensions: ["glyph", "filter"],
      checkbox: false,
      selectMode: 2,
      debugLevel: 0,
      autoScroll: true,
      // closeOnExternalClick:false,
      // flapMargin:0,
      filter: { mode: 'hide' },
      activate: function(event,data) {
          // console.log("activate " + data.node.key);

          var listitem = $(".title-field[kid='" + data.node.key + "']");
          $('.row_selected').removeClass('row_selected');
          $(listitem).closest('tr').addClass('row_selected')
      },
      glyph: {
          map: {
              doc: "",
              docOpen: "",
              error: "glyphicon glyphicon-warning-sign",
              expanderClosed: "glyphicon glyphicon-plus-sign",
              expanderLazy: "glyphicon glyphicon-plus-sign",
              // expanderLazy: "glyphicon glyphicon-expand",
              expanderOpen: "glyphicon glyphicon-minus-sign",
              // expanderOpen: "glyphicon glyphicon-collapse-down",
              folder: "",
              folderOpen: "",
              loading: "glyphicon glyphicon-refresh"
//              loading: "icon-spinner icon-spin"
          }
      },
      source: {
//          url: "/fancy_nested.json",
          url: Settings.baseUrl + "/features/fancy_nested.json?view_code=" + $('nav li.form-group input[name=option2]:checked').val(),
          cache: false,
          debugDelay: 1000,
          timeout: 30000,
          error: function(e) {
              notify.warn("networkerror","Error retrieving tree from kmaps server.");
          }
      },
      activate: function(event, data) {
        //alert(JSON.stringify(data.node.title));
        window.location.hash = "id=" + data.node.key;
      },
      focus: function(event, data){ data.node.scrollIntoView(true); },
      renderNode: function(event,data) {
          if (!data.node.isStatusNode) {
              decorateElementWithPopover(data.node.span, data.node);
          }
      },
      cookieId: "kmaps1tree", // set cookies for search-browse tree, the first fancytree loaded
      idPrefix: "kmaps1tree"
   });


    // Render the search results into the dataTable
    // This presumes the results are a list of a certain structure
    //
    var renderSearchResults = function (ret) {
//              //      ("json: " + JSON.stringify(resultHash));

        var txt = $("#searchform").val();
        var resultHash = {};
        $(ret.features).each(function () {
            console.log(JSON.stringify(this));
            if (this.feature_types && this.feature_types.length > 0) {
                // for places, list the feature type
                resultHash[this.id] = this.feature_types[0].title;
            } else {
                resultHash[this.id] = (this.ancestors)?this.ancestors.features[0].header:"unknown";
            }
        });

        var tree = $('#tree').fancytree('getTree').applyFilter(function (node) {
            return (typeof resultHash[node.key] !== 'undefined');
        });
        // $('span.fancytree-match').removeClass('fancytree-match');
        $('span.fancytree-title').highlight(txt, { element: 'mark' });
        // Retrieve matches
        var list = $('#tree').fancytree('getRootNode').findAll(function (n) {
            return n.match;
        });

        if (list.length === 0) {
            notify.warn("warnnoresults", "There are no matches.  <br>Try to modify your search.");
        }

        // clear the current list.

        $('div.listview div div.table-responsive table.table-results tr').not(':first').remove();
        //                    $('div.th div div.table-responsive table.table-results tr').not(':first').remove();

        // populate list
        var table = $('div.listview div div.table-responsive table.table-results');
        $.each(list, function (x, y) {
            table.find('tbody').append(
                decorateElementWithPopover(
                    $('<tr>')
                        .append($('<td>')
                            .append(
                                $('<span class="title-field">').text(y.title).attr('kid', y.key)
                                    .highlight(txt, { element: 'mark' }).trunk8({ tooltip: false }))
                        )
                        .append($('<td><div>' + resultHash[y.key] + '</div></td>')),y
                )
            );
        });

        $("table.table-results tbody tr").click(function (event) {
            var kid = $(event.target).closest('.title-field').attr('kid') || $($(event.target).find('.title-field')[0]).attr('kid');
            $('.row_selected').removeClass('row_selected');
            $(event.target).closest('tr').addClass('row_selected');
            $("#tree").animate({ scrollTop: 0 }, "slow");
            $('#tree')
                .fancytree('getTree')
                .activateKey(
                    kid
                ).scrollIntoView();
        });

        $('table.table-results').dataTable();

    };


    function maskSearchResults( isMasked ) {
        var showhide = (isMasked)?'show':'hide';
        $('.view-section>.tab-content').overlayMask(showhide);
    }

    function searchClassicKmaps(txt, searchargs) {
        var searchurl = Settings.baseUrl + "/features/by_fields/" + txt + ".json?per_page=3000" + $.param(searchargs);
//            console.log("Search URL = " + searchurl);
        $.ajax({
            type: "GET",
            url: searchurl,
            dataType: "json",
            timeout: 30000,
            error: function (e) {
                notify.warn("searcherror", "Error retrieving search: " + e.statusText + " (" + e.status + ")");
            },
            beforeSend: function () {
                maskSearchResults(true);
            },
            success: renderSearchResults,
            complete: function () {
                maskSearchResults(false);
            }
        });
    }

    var handleSearch = function handleSearch() {
        // clear previous styling
        // (can't simply unwrap because that leaves text nodes in extraneous chunks)
        $('span.fancytree-title').each(
            function () {
                $(this).text($(this).text());
            }
        );

        var txt = $("#searchform").val();
        if (!txt) {
            searchUtil.clearSearch();
            notify.clear();
        } else if (txt.length < SEARCH_MIN_LENGTH) {
            notify.clear();
            notify.warn('warntooshort', 'Search string must be ' + SEARCH_MIN_LENGTH + ' characters or longer.');
        } else {
            notify.clear();
            // notify.warn('debug',$('#termscope')[0].checked);
           //  var nameck = $('#termscope')[0].checked?1:0; 05-28 markf

            var sumck = $('#summaryscope')[0].checked?1:0;
            var essck = $('#essayscope')[0].checked?1:0;
            var searchargs = {
                // name: nameck,
                caption: sumck,
                summary: sumck,
                id: 1,
                description: essck
            };

            $('table.table-results').dataTable().fnDestroy();
            searchClassicKmaps(txt, searchargs);
            return false;
        }
    };

    $("#searchbutton").click(handleSearch);
  $('#searchform').attr('autocomplete','off'); // turn off browser autocomplete
  $("form.form").submit(handleSearch);
  $("#searchform").keyup( function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
        e.preventDefault();
        handleSearch();
    }
  });

  //    $('.table-v').on('shown.bs.tab', function() { $('.title-field').trunk8(); });
    $('.listview').on('shown.bs.tab', function() {
        var header = (location.pathname.indexOf('subjects') !== -1)?"<th>Name</th><th>Root Category</th>":"<th>Name</th><th>Feature Type</th>";
        $('div.listview div div.table-responsive table.table-results tr:has(th):not(:has(td))').html(header);
        $(".title-field").trunk8({ tooltip:false });
        if ($('.row_selected')[0]) {
            if ($('.listview')) {
                $('.listview').scrollTo($('.row_selected')[0]);
            }
        }
    });
    $('.treeview').on('shown.bs.tab', function () {

        // This doesn't always scroll correctly
        var activeNode = $('#tree').fancytree("getTree").getActiveNode();
        if (activeNode) {
            activeNode.makeVisible();
        }
    });
    $('#tree').on('click', '.fancytree-statusnode-error', function () {
        $('#tree').fancytree();
    });


  // untruncate on mouseover
  //    $('.listview').on({
  //       'mouseenter': function () { $(this).trunk8('revert'); },
  //        'mouseout': function () { $(this).trunk8({ tooltip:false }).popover(); }
  //    },'.title-field');

});



// --- kms, KMAPS MAIN SEARCH INPUT ---
jQuery(function($) {
  var kms = $("#searchform"); // the main search input
  $(kms).data("holder",$(kms).attr("placeholder"));

  // --- features inputs - focusin / focusout
  $(kms).focusin(function(){
      $(kms).attr("placeholder","");
      $("button.searchreset").show("fast");
  });
  $(kms).focusout(function(){
      $(kms).attr("placeholder",$(kms).data("holder"));
      $("button.searchreset").hide();

    var str = "Enter Search...";
    var txt = $(kms).val();

    if (str.indexOf(txt) > -1) {
      $("button.searchreset").hide();
    return true;
    } else {
      $("button.searchreset").show(100);
    return false;
    }
  });
  // --- close and clear all
  $("button.searchreset").click(function(){
    $(kms).attr("placeholder",$(kms).data("holder"));
    $("button.searchreset").hide();
    $(".alert").hide();
        searchUtil.clearSearch();
        $('#tree').fancytree("getTree").clearFilter();
  });

});



// -------------------------
// -------------------------
// *** BEGIN feature trees
// -------------------------
// -------------------------
var feature1_filterUtil = {
    feature1_clearFilter: function() {
        if ($('#feature-tree1').fancytree('getActiveNode')) {
            $('#feature-tree1').fancytree('getActiveNode').setActive(false);
        }
        // $('#feature-tree1').fancytree('getTree').clearFilter();
        $('#feature-tree1').fancytree("getRootNode").visit(function (node) {
            node.setExpanded(false);
        });
    }
};
var feature2_filterUtil = {
    feature2_clearFilter: function() {
        if ($('#feature-tree2').fancytree('getActiveNode')) {
            $('#feature-tree2').fancytree('getActiveNode').setActive(false);
        }
        // $('#feature-tree1').fancytree('getTree').clearFilter();
        $('#feature-tree2').fancytree("getRootNode").visit(function (node) {
            node.setExpanded(false);
        });
    }
};
var feature3_filterUtil = {
    feature3_clearFilter: function() {
        if ($('#feature-tree3').fancytree('getActiveNode')) {
            $('#feature-tree3').fancytree('getActiveNode').setActive(false);
        }
        // $('#feature-tree1').fancytree('getTree').clearFilter();
        $('#feature-tree3').fancytree("getRootNode").visit(function (node) {
            node.setExpanded(false);
        });
    }
};


jQuery(function($) {
	// *** feature type ***
	  $("#feature-tree1").fancytree({
    extensions: ["glyph", "edit", "filter"],
    checkbox: true,
    selectMode: 3, // multiselect enabled
    // minExpandLevel: 2,
    select: function(event, data) {
        // Get a list of all selected nodes, and convert to a key array:
        var selKeys = $.map(data.tree.getSelectedNodes(), function(node){
          return node.key;
        });
        $("#echoSelection3").text(selKeys.join(", "));

        // Get a list of all selected TOP nodes
        var selRootNodes = data.tree.getSelectedNodes(true);
        // ... and convert to a key array:
        var selRootKeys = $.map(selRootNodes, function(node){
          return node.key;
        });
        $("#echoSelectionRootKeys3").text(selRootKeys.join(", "));
        $("#echoSelectionRoots3").text(selRootNodes.join(", "));
      },
      dblclick: function(event, data) {
        data.node.toggleSelected();
      },
      keydown: function(event, data) {
        if( event.which === 32 ) {
          data.node.toggleSelected();
          return false;
        }
      },
    glyph: {
      map: {
        checkbox: "glyphicon glyphicon-unchecked",
        checkboxSelected: "glyphicon glyphicon-check",
        checkboxUnknown: "glyphicon glyphicon-share",
        error: "glyphicon glyphicon-warning-sign",
        expanderClosed: "glyphicon glyphicon-plus-sign",
        expanderLazy: "glyphicon glyphicon-plus-sign",
        expanderOpen: "glyphicon glyphicon-minus-sign",
        loading: "glyphicon glyphicon-refresh"
      }
    },
    // url: Settings.subjectsUrl + "/features/20/fancy_nested.json",
    source: {url: "http://subjects.kmaps.virginia.edu/features/20/fancy_nested.json", debugDelay: 1000},
    filter: {
        mode: "hide"
    },
    activate: function(event, data) {
        //  alert("activate " + data.node);
    },
    lazyLoad: function(event, ctx) {
        ctx.result = {url: "ajax-sub2.json", debugDelay: 1000};
     },
    click: function(e, data) {
      // We should not toggle, if target was "checkbox", because this
      // would result in double-toggle (i.e. no toggle)
      if( $.ui.fancytree.getEventTargetType(e) == "title" ){
        data.node.toggleSelected();
      }
    },
    keydown: function(e, data) {
      if( e.which === 32 ) {
        data.node.toggleSelected();
        return false;
      }
    },
    cookieId: "feature1tree", // set cookies
    idPrefix: "feature1tree"
  });



  $("#feature-tree2").fancytree({
    extensions: ["glyph", "edit", "filter"],
    checkbox: true,
    selectMode: 3, // multiselect enabled
    select: function(event, data) {
        // Get a list of all selected nodes, and convert to a key array:
        var selKeys = $.map(data.tree.getSelectedNodes(), function(node){
          return node.key;
        });
        $("#echoSelection3").text(selKeys.join(", "));

        // Get a list of all selected TOP nodes
        var selRootNodes = data.tree.getSelectedNodes(true);
        // ... and convert to a key array:
        var selRootKeys = $.map(selRootNodes, function(node){
          return node.key;
        });
        $("#echoSelectionRootKeys3").text(selRootKeys.join(", "));
        $("#echoSelectionRoots3").text(selRootNodes.join(", "));
      },
      dblclick: function(event, data) {
        data.node.toggleSelected();
      },
      keydown: function(event, data) {
        if( event.which === 32 ) {
          data.node.toggleSelected();
          return false;
        }
      },
    glyph: {
      map: {
        checkbox: "glyphicon glyphicon-unchecked",
        checkboxSelected: "glyphicon glyphicon-check",
        checkboxUnknown: "glyphicon glyphicon-share",
        error: "glyphicon glyphicon-warning-sign",
        expanderClosed: "glyphicon glyphicon-plus-sign",
        expanderLazy: "glyphicon glyphicon-plus-sign",
        expanderOpen: "glyphicon glyphicon-minus-sign",
        loading: "glyphicon glyphicon-refresh"
      }
    },
    // url: Settings.subjectsUrl + "/features/20/fancy_nested.json",
    source: {url: "http://subjects.kmaps.virginia.edu/features/20/fancy_nested.json", debugDelay: 1000},
    filter: {
        mode: "hide"
    },
    activate: function(event, data) {
        //  alert("activate " + data.node);
    },
    lazyLoad: function(event, ctx) {
        ctx.result = {url: "ajax-sub2.json", debugDelay: 1000};
     },
    click: function(e, data) {
      // We should not toggle, if target was "checkbox", because this
      // would result in double-toggle (i.e. no toggle)
      if( $.ui.fancytree.getEventTargetType(e) == "title" ){
        data.node.toggleSelected();
      }
    },
    keydown: function(e, data) {
      if( e.which === 32 ) {
        data.node.toggleSelected();
        return false;
      }
    },
    cookieId: "feature2tree", // set cookies
    idPrefix: "feature2tree"
  });


  $("#feature-tree3").fancytree({
    extensions: ["glyph", "edit", "filter"],
    checkbox: true,
    selectMode: 3, // multiselect enabled
    select: function(event, data) {
        // Get a list of all selected nodes, and convert to a key array:
        var selKeys = $.map(data.tree.getSelectedNodes(), function(node){
          return node.key;
        });
        $("#echoSelection3").text(selKeys.join(", "));

        // Get a list of all selected TOP nodes
        var selRootNodes = data.tree.getSelectedNodes(true);
        // ... and convert to a key array:
        var selRootKeys = $.map(selRootNodes, function(node){
          return node.key;
        });
        $("#echoSelectionRootKeys3").text(selRootKeys.join(", "));
        $("#echoSelectionRoots3").text(selRootNodes.join(", "));
      },
      dblclick: function(event, data) {
        data.node.toggleSelected();
      },
      keydown: function(event, data) {
        if( event.which === 32 ) {
          data.node.toggleSelected();
          return false;
        }
      },
    glyph: {
      map: {
        checkbox: "glyphicon glyphicon-unchecked",
        checkboxSelected: "glyphicon glyphicon-check",
        checkboxUnknown: "glyphicon glyphicon-share",
        error: "glyphicon glyphicon-warning-sign",
        expanderClosed: "glyphicon glyphicon-plus-sign",
        expanderLazy: "glyphicon glyphicon-plus-sign",
        expanderOpen: "glyphicon glyphicon-minus-sign",
        loading: "glyphicon glyphicon-refresh"
      }
    },
    // url: Settings.subjectsUrl + "/features/20/fancy_nested.json",
    source: {url: "http://subjects.kmaps.virginia.edu/features/20/fancy_nested.json", debugDelay: 1000},
    filter: {
        mode: "hide"
    },
    activate: function(event, data) {
        //  alert("activate " + data.node);
    },
    lazyLoad: function(event, ctx) {
        ctx.result = {url: "ajax-sub2.json", debugDelay: 1000};
     },
    click: function(e, data) {
      // We should not toggle, if target was "checkbox", because this
      // would result in double-toggle (i.e. no toggle)
      if( $.ui.fancytree.getEventTargetType(e) == "title" ){
        data.node.toggleSelected();
      }
    },
    keydown: function(e, data) {
      if( e.which === 32 ) {
        data.node.toggleSelected();
        return false;
      }
    },
    cookieId: "feature3tree", // set cookies
    idPrefix: "feature3tree"
  });
  // ----------------------------------
	// --- END extruder



  // --- Feature Inputs ---------------
  // ----------------------------------
  var tree1 = $("#feature-tree1").fancytree("getTree");
  var tree2 = $("#feature-tree2").fancytree("getTree");
  var tree3 = $("#feature-tree3").fancytree("getTree");
  var feature1 = $("#feature-type");
  var feature2 = $("#feature-subject");
  var feature3 = $("#feature-region");
  $(feature1).data("holderf1",$(feature1).attr("placeholder"));
  $(feature2).data("holderf2",$(feature2).attr("placeholder"));
  $(feature3).data("holderf3",$(feature3).attr("placeholder"));
  
  // --- feature-Type -----------
	// ----------------------------
  $(feature1).focusin(function(){
      $(this).dropdown();
      $(".dropdown-subject, .dropdown-region").parent().removeClass("open");
      $(this).attr("placeholder","");
      $("#feature1a-reset").show(100);
      $("#feature1a-reset, #feature1b-reset").attr("disabled", false);
  });
  $(feature1).focusout(function(){
      $(this).attr("placeholder",$(feature1).data("holderf1"));
      $("#feature1a-reset").hide();
      $(this).dropdown();

      var strf1 = "Filter by Feature Type";
      var txtf1 = $(feature1).val();
      if (strf1.indexOf(txtf1) > -1) {
        $("#feature1a-reset").hide();
      return true;
      } else {
        $("#feature1a-reset").show(100);
      return false;
      }
  });
  // --- features inputs - keydown / keyup / click
  $("input[name=feature-type]").keydown(function(e){
      $(feature1).dropdown();
      $(".type.filter").show(100);
      $("#feature1a-reset,#feature1b-reset").attr("disabled", false);
      return;
  });
  $("input[name=feature-type]").keyup(function(e){
    var match = $(this).val();
    if(e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === ""){
      $("#feature1a-reset,#feature1b-reset").click();
      return;
    }
    // Pass text as filter string (will be matched as substring in the node title)
    var n = tree1.applyFilter(match);
      $("#feature1a-reset,#feature1b-reset").attr("disabled", false);
      $("#matches1").text("(" + n + " matches)");
  }).focus();

  // stop closing on click in dropdown & feature input 
  $(function () { 
    $(document).on('click', '#feature-type, .dropdown-type', function(e) {
       e.stopPropagation();
    })
  }); 

  // close and clear all
  $("#feature1a-reset, #feature1b-reset").click(function(event){
  	$(".dropdown-type").parent().removeClass("open");
    $(feature1).attr("placeholder",$(feature1).data("holderf1"));
    $("input[name=feature-type]").val("");    
    $("#matches1").text("");
    $(".type.filter, #feature1a-reset").hide();   
    $("#feature-tree1").fancytree();
    tree1.clearFilter();
    feature1_filterUtil.feature1_clearFilter(); 
  }).attr("disabled", true);
  
 
  // close dropdown on outside clicking 
  $(document).click( function(){
    $(".dropdown-type").parent().removeClass("open");
  });


  // --- feature-Subject --------
	// ----------------------------
  $(feature2).focusin(function(){
      $(this).dropdown();
      $(".dropdown-type, .dropdown-region").parent().removeClass("open");
      $(this).attr("placeholder","");
      $("#feature2a-reset").show(100); 
      $("#feature2a-reset, #feature2b-reset").attr("disabled", false);
  });
  $(feature2).focusout(function(){
      $(this).attr("placeholder",$(feature2).data("holderf2"));
      $("#feature2a-reset").hide();
      $(this).dropdown();

      var strf2 = "Filter by Feature Subject";
      var txtf2 = $(feature2).val();
      if (strf2.indexOf(txtf2) > -1) {
        $("#feature2a-reset").hide();
      return true;
      } else {
        $("#feature2a-reset").show(100);
      return false;
      }
  });
  // --- features inputs - keydown / keyup / click
  $("input[name=feature-subject]").keydown(function(e){
      $(feature2).dropdown();
      $(".subject.filter").show(100);
      $("#feature1a-reset,#feature1b-reset").attr("disabled", false);
      return;
  });
  $("input[name=feature-subject]").keyup(function(e){
    var match = $(this).val();
    if(e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === ""){
      $("#feature2a-reset, #feature2b-reset").click();
      return;
    }
    // Pass text as filter string (will be matched as substring in the node title)
    var n = tree2.applyFilter(match);
      $("#feature2a-reset, #feature2b-reset").attr("disabled", false);
      $("#matches2").text("(" + n + " matches)");
  }).focus();

  // stop closing on click in dropdown & feature input
  $(function () { 
    $(document).on('click', '#feature-subject, .dropdown-subject', function(e) {
       e.stopPropagation();
    })
  });
  
  // close and clear all
  $("#feature2a-reset, #feature2b-reset").click(function(event){
  	$(".dropdown-subject").parent().removeClass("open");
    $(feature2).attr("placeholder",$(feature2).data("holderf2"));
    $("input[name=feature-subject]").val("");
    $("#matches2").text("");
    $(".subject.filter, #feature2a-reset").hide();
    $("#feature-tree2").fancytree();
    tree2.clearFilter();
    feature2_FilterUtil.feature2_clearFilter();
  }).attr("disabled", true);
  
  // close dropdown on outside clicking 
  $(document).click( function(){
    $(".dropdown-subject").parent().removeClass("open");
  });



  // --- feature-Region ---------
	// ----------------------------
  $(feature3).focusin(function(){
      $(this).dropdown();
      $(".dropdown-type, .dropdown-subject").parent().removeClass("open");
      $(this).attr("placeholder","");
      $("#feature3a-reset").show(100); // switched to negative indent since hide() not working consistently
      $("#feature3a-reset, #feature3b-reset").attr("disabled", false);
  });
  $(feature3).focusout(function(){
      $(this).attr("placeholder",$(feature3).data("holderf3"));
      $("#feature3a-reset").hide();
      $(this).dropdown();

      var strf3 = "Filter by Feature Region";
      var txtf3 = $(feature3).val();
      if (strf3.indexOf(txtf3) > -1) {
        $("#feature3a-reset").hide();
      return true;
      } else {
        $("#feature3a-reset").show(100);
      return false;
      }
  });
  // --- features inputs - keydown / keyup / click
  $("input[name=feature-region]").keydown(function(e){
      $(feature3).dropdown();
      $(".region.filter").show(100);
      $("#feature3a-reset,#feature3b-reset").attr("disabled", false);
      return;
  });
  $("input[name=feature-region]").keyup(function(e){
    var match = $(this).val();
    if(e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === ""){
      $("#feature3a-reset, #feature3b-reset").click();
      return;
    }
    // Pass text as filter string (will be matched as substring in the node title)
    var n = tree3.applyFilter(match);
      $("#feature3a-reset, #feature3b-reset").attr("disabled", false);
      $("#matches3").text("(" + n + " matches)");
  }).focus();
    
  // stop closing on click in dropdown & feature input
  $(function () { 
    $(document).on('click', '#feature-region, .dropdown-region', function(e) {
       e.stopPropagation();
    })
  });
  
  // close and clear all
  $("#feature3a-reset, #feature3b-reset").click(function(event){
  	$(".dropdown-region").parent().removeClass("open");
    $(feature3).attr("placeholder",$(feature3).data("holderf3"));
    $("input[name=feature-region]").val("");
    $("#matches3").text("");
    $(".region.filter, #feature3a-reset").hide();    
    $("#feature-tree3").fancytree();
    tree3.clearFilter();
    feature3_FilterUtil.feature3_clearFilter();
  }).attr("disabled", true);
 
  // close dropdown on outside clicking
  $(document).click( function(){
    $(".dropdown-region").parent().removeClass("open");
  });
  
});


// *** SEARCH *** feature types
jQuery(function ($) {
  // manually initiate dropdown w/bstrap
  $(".dropdown-toggle").dropdown();
  
  $(".feature-help").toggle(
    function () {
          $(".feature-message").slideDown( 300 ).delay( 9000 ).slideUp( 300 );
      },
    function () {
          $(".feature-message").slideUp( 300 );
      }
  );
});


/* Additions by Gerard Ketuma */

// *** Change fancytree to accomodate different languagues ***
jQuery(function($) {
  $('nav li.form-group input[name=option2]').on('ifChecked', function(e) {
    console.log("This should work");
    var newSource = Settings.baseUrl + "/features/fancy_nested.json?view_code=" + $('nav li.form-group input[name=option2]:checked').val();
    $("#tree").fancytree("option", "source.url", newSource);
  });
});


// *** Hash Change events ***
jQuery(function($) {
  $(window).bind('hashchange', function(e) {
    var hash_obj = $.deparam.fragment();
    //Set the hash to the global settings object
    Settings.hash_obj = hash_obj;
    var fragment = $.param.fragment();
    //check if we are in the overlay and quit
    if ( fragment !== undefined && fragment.indexOf('overlay') !== -1 ) { return; };

    if (location.pathname.indexOf('subjects') !== -1) {
      Settings.app = 'subject';
      var mHash = hash_obj.id || '2823';
      var mUrl = Settings.baseUrl + "/features/" + mHash + ".json";
      $.get(mUrl, processSubjectsData);
    }

    if (location.pathname.indexOf('places') !== -1) {
      Settings.app = 'place';
      var mHash = hash_obj.id || '13735';
      var mUrl = Settings.placesUrl + "/features/" + mHash + ".json";
      $.get(mUrl, processPlacesData);
    }

  });

  $(window).trigger( 'hashchange' );
});

/**
 * Function that will process the returned data and create the various sections of the page.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function processSubjectsData(data) {
  //Global variable to hold all the related resources count
  shanti = {
    shanti_related_counts: data.feature.associated_resources,
    shanti_id: data.feature.id,
    shanti_data: data
  };

  //Remove all content from show related pages
  $('.show-related-pages').empty();
  $('.content-section article.tab-pane').empty();

  //Removes previous binds for the show related tabs.
  $('a[href="#tab-overview"]').unbind('show.bs.tab');

  //Removes previous binds for the show related tabs.
  $('a[href="#tab-subjects"]').unbind('show.bs.tab');

  //Removes previous binds for the show related photos tab.
  $('a[href="#tab-photos"]').unbind('show.bs.tab');

  //Removes previous binds for the show related audio-video tab.
  $('a[href="#tab-audio-video"]').unbind('show.bs.tab');

  //Remove previous binds for the show related places tab.
  $('a[href="#tab-places"]').unbind('show.bs.tab');

  //Remove previous binds for the show related texts tab.
  $('a[href="#tab-texts"]').unbind('show.bs.tab');

  //Remove previous binds for the show related essays tab.
  $('a[href="#tab-essays"]').unbind('show.bs.tab');

  //Change the page title to that of the new page being loaded
  $(".page-title span").html(data.feature.header);

  //Remove all the active classes from the pills so that their bind functions can trigger
  $(".content-resources ul.nav-pills li").removeClass("active");

  //Make the overview tab the default tab on URL Change.
  //$("a[href='#tab-overview']").click();

  //Remove all elements from Breadcrumbs and start adding them again.
  $("ol.breadcrumb li").remove();
  $("ol.breadcrumb").append('<li><a href="">Subjects:</a></li>');
  $.each(data.feature.ancestors, populateBreadcrumbs);

  //First Hide all the elements from the left hand navigation and then show relevant ones
  $(".content-resources ul.nav-pills li").hide();

  //Proces the solr index for more left hand content
  var solrURL = 'http://kidx.shanti.virginia.edu/solr/kmindex/select?q=kmapid:subjects-' + Settings.hash_obj.id + '&fq=&start=0&facets=on&group=true&group.field=service&group.facet=true&group.ngroups=true&group.limit=0&wt=json';
  $.get(solrURL, processSubjectsSolr);

  //Get the element that we want and display to overview.
  //Show overview tab on the left hand column
  if (data.feature) {
    $(".content-resources ul.nav-pills li.overview").show();
    $('a[href="#tab-overview"]').one('show.bs.tab', function(e) {
      //Push a state to the url hash so we can bookmark it
      $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
      $.bbq.removeState('nid');

      var $tabOverview = $("#tab-overview");
      $tabOverview.empty();
      $tabOverview.append('<h6>' + data.feature.header + '</h6>');
      if (data.feature.summaries.length > 0) {$tabOverview.append(data.feature.summaries[0].content)}
      if (data.feature.illustrations.length > 0 && data.feature.illustrations[0].type != 'external') {
        $.get(data.feature.illustrations[0].url, showOverviewImage);
      }
    });
  }

  //Related content section
  if (data.feature.associated_resources.related_feature_count > 0) {
    $("ul.nav li a[href='#tab-subjects'] .badge").text(data.feature.associated_resources.related_feature_count);
    $(".content-resources ul.nav-pills li.subjects").show();
    $('a[href="#tab-subjects"]').unbind('show.bs.tab').one('show.bs.tab', function(e) {
      //Push a state to the url hash so we can bookmark it
      $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
      $.bbq.removeState('nid');

      var $tabRelated = $("#tab-subjects");
      $tabRelated.empty();
      $tabRelated.append('<h6>' + data.feature.header + '</h6>');
      var relatedUrl = Settings.baseUrl + "/features/" + data.feature.id + "/related.json";
      $.get(relatedUrl, relatedResources);
    });
  }

  //Related essays (descriptions) section
  if (data.feature.associated_resources.description_count > 0) {
    $("ul.nav li a[href='#tab-essays'] .badge").text(data.feature.associated_resources.description_count);
    $(".content-resources ul.nav-pills li.essays").show();
    $('a[href="#tab-essays"]').unbind('show.bs.tab').one('show.bs.tab', function(e) {
      //Push a state to the url hash so we can bookmark it
      $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
      $.bbq.removeState('nid');
      
      var $tabEssays = $("#tab-essays");
      $tabEssays.empty();
      var essaysURL = Settings.baseUrl + '/features/' + data.feature.id + '/descriptions.json';
      $.get(essaysURL, relatedEssays);
    });
  }

  //Related Places section
  if (data.feature.associated_resources.place_count > 0) {
    $("ul.nav li a[href='#tab-places'] .badge").text(data.feature.associated_resources.place_count);
    $(".content-resources ul.nav-pills li.places").show();
    $('a[href="#tab-places"]').unbind('show.bs.tab').one('show.bs.tab', function(e) {
      //Push a state to the url hash so we can bookmark it
      $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
      $.bbq.removeState('nid');

      var $tabPlaces = $("#tab-places");
      $tabPlaces.empty();
      var placesURL = Settings.placesUrl + '/topics/' + data.feature.id + '.json';
      shanti.placesURL = placesURL;
      $.get(placesURL, relatedPlaces);
    });
  }

  //Related Photos (picture) section
  if (data.feature.associated_resources.picture_count > 0) {
    $("ul.nav li a[href='#tab-photos'] .badge").text(data.feature.associated_resources.picture_count);
    $(".content-resources ul.nav-pills li.photos").show();
    $('a[href="#tab-photos"]').unbind('show.bs.tab').one('show.bs.tab', function(e) {
      //Push a state to the url hash so we can bookmark it
      $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
      $.bbq.removeState('nid');

      var $tabPhotos = $("#tab-photos");
      $tabPhotos.empty();
      $tabPhotos.append('<h6>Photographs in ' + data.feature.header + '</h6>');
      var photosURL = Settings.mmsUrl + "/topics/" + data.feature.id + "/pictures.json?per_page=30";
      shanti.photosURL = photosURL;
      shanti.feature_id = data.feature.id;
      //$.get(photosURL, relatedPhotos);
      $.ajax({
        url: photosURL,
        beforeSend: function(xhr) {
          $('li.photos i').removeClass('icon shanticon-photos').addClass('fa fa-spinner fa-spin');
        }
      })
      .done(relatedPhotos)
      .always(function() {
        $('li.photos i').removeClass('fa fa-spinner fa-spin').addClass('icon shanticon-photos');
      });
    });
  }

  //Related Audio-Video (videos) section
  // if (true) {
  //   $("ul.nav li a[href='#tab-audio-video'] .badge").text(data.feature.associated_resources.video_count == 0 ? '1' : data.feature.associated_resources.video_count);
  //   $(".content-resources ul.nav-pills li.audio-video").show();
  //   $('a[href="#tab-audio-video"]').one('show.bs.tab', function(e) {
  //     var $tabAudioVideo = $("#tab-audio-video");
  //     $tabAudioVideo.empty();
  //     $tabAudioVideo.append('<h6>' + 'Videos in ' + data.feature.header + '</h6>');
  //     var audioVideoUrl = 'http://mediabase.drupal-dev.shanti.virginia.edu/services/subject/' + data.feature.id;
  //     $.get(audioVideoUrl, relatedVideos);
  //   });
  // }

  //Related Texts section
  if (data.feature.associated_resources.document_count > 0) {
    $("ul.nav li a[href='#tab-texts'] .badge").text(data.feature.associated_resources.document_count);
    $(".content-resources ul.nav-pills li.texts").show();
    $('a[href="#tab-texts"]').unbind('show.bs.tab').one('show.bs.tab', function(e) {
      //Push a state to the url hash so we can bookmark it
      $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
      $.bbq.removeState('nid');
      
      var $tabTexts = $("#tab-texts");
      $tabTexts.empty();
      $tabTexts.append('<h6>Texts in ' + data.feature.header + '</h6>');
      var textsURL = Settings.mmsUrl + "/topics/" + data.feature.id + "/documents.json";
      $.get(textsURL, relatedTexts);
    });
  }
  // var testUrl = location.href.substr(0, location.href.lastIndexOf('subjects')) + 'sharedshelf/api/projects/534/assets/filter/fd_24809_lookup.links.source_id/' + data.feature.id + '.json';
  // $.get(testUrl, function(data) {
  //   console.log(data);
  // });
}

//Function to process solr index data
function processSubjectsSolr(data) {
  var data = $.parseJSON(data);

  $('a[href="#tab-audio-video"]').unbind('show.bs.tab');

  $.each(data.grouped.service.groups, function(solrIndex, solrSection) {
    //Related Audio-Video (videos) section
    if (solrSection.groupValue == "mediabase" && solrSection.doclist.numFound > 0) {
      $("ul.nav li a[href='#tab-audio-video'] .badge").text(solrSection.doclist.numFound);
      $(".content-resources ul.nav-pills li.audio-video").show();
      $('a[href="#tab-audio-video"]').unbind('show.bs.tab').one('show.bs.tab', function(e) {
        //Push a state to the url hash so we can bookmark it
        $.bbq.pushState({que: $(e.target).attr('href').substr(1)});
        $.bbq.removeState('nid');

        if (!e.relatedTarget) {
          var $tabAudioVideo = $("#tab-audio-video");
          $tabAudioVideo.empty();
          $tabAudioVideo.append('<h6>Audio/Video</h6>');
          var audioVideoUrl = Settings.mediabaseURL + '/services/' + Settings.app + '/' + Settings.hash_obj.id + '?rows=12';
          $.get(audioVideoUrl, relatedVideos);
        }

      });
    }

    //Related Photos section
    // if (solrSection.groupValue == "sharedshelf" && solrSection.doclist.numFound > 0) {
    //   $("ul.nav li a[href='#tab-photos'] .badge").text(solrSection.doclist.numFound);
    //   $(".content-resources ul.nav-pills li.photos").show();
    // }
  });

  //Load default tab
  if (Settings.hash_obj.nid) {
    var pageURL = Settings.mediabaseURL + '/api/v1/media/node/' + Settings.hash_obj.nid + '.json';
    $.get(pageURL, showAudioVideoPage);
  } else {
    $('.content-resources').find('a[href="#' + (Settings.hash_obj.que || 'tab-overview') + '"]').click();
  }

}

function populateBreadcrumbs(bInd, bVal) {
  $breadcrumbOl = $("ol.breadcrumb");
  $breadcrumbOl.append('<li><a href="#id=' + bVal.id + '">' + bVal.header + '</a><i class="fa fa-angle-right"></i></li>');
}

function showOverviewImage(data) {
  var retString = '<figure class="cap-bot">';
  retString += '<img src="' + data.picture.images[3].url + '" class="img-responsive img-thumbnail" alt="' + 
    (data.picture.captions.length > 0 ? data.picture.captions[0].title : "") + '">';
  retString += '<figcaption>' + (data.picture.captions.length > 0 ? "<div class=\"center-caption\">" + data.picture.captions[0].title + "</div>" : "") + 
    (data.picture.descriptions.length > 0 ? data.picture.descriptions[0].title : "") + '</figcaption>';
  retString += '</figure>';

  $("#tab-overview").append(retString);
}

//Function to populate related tab
function relatedResources(data) {
  var $tabRelated = $("#tab-subjects");
  var contentR = '<ul class="list-unstyled list-group">';
  $.each(data.feature_relation_types, function(rInd, rElm) {
    contentR += '<li class="list-group-item">' + capitaliseFirstLetter(rElm.label) + " (" + rElm.features.length + "):";
    contentR += '<ul class="list-group">';
    $.each(rElm.features, function(rrInd, rrElm) {
      contentR += '<li class="list-group-item"><a href="#id=' + rrElm.id + '&que=tab-overview">' + rrElm.header + ' (From the General Perspective)</a></li>';
    });
    contentR += '</ul>';
    contentR += '</li>';
  });
  contentR += '</ul>';
  $tabRelated.append(contentR);
}

//Function to populate photos tab
function relatedPhotos(data) {

  console.log(data);
  
  var contentPh = '<div class="related-photos">';

  //First get and show photos from sharedshelf
  var sharedShelfURL = location.href.substr(0, location.href.lastIndexOf('subjects')) + 'sharedshelf/api/projects/534/assets/filter/fd_24809_lookup.links.source_id/' + shanti.feature_id + '.json';
  $.get(sharedShelfURL, function(ssData) {
    console.log(ssData);
  });

  $.each(data.topic.media, function(rInd, rElm) {
    contentPh += '<div class="each-photo">';
    contentPh += '<a href="#pid' + rElm.id + '" class="thumbnail" data-toggle="modal">';
    contentPh += '<img src="' + rElm.images[0].url + '" alt="' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '">';
    contentPh += '</a>';
    contentPh += '</div>';

    //Modal for each photo
    contentPh += '<div class="modal fade" tabindex="-1" role="dialog" id="pid' + rElm.id + '">';
    contentPh += '<div class="modal-dialog">';
    contentPh += '<div class="modal-content">';
    contentPh += '<div class="modal-header">';
    contentPh += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    contentPh += '<h4 class="modal-title" id="myModalLabel">' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '</h4>';
    contentPh += '</div>';
    contentPh += '<div class="modal-body">';
    contentPh += '<img src="' + rElm.images[4].url + '" alt="' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '">';
    contentPh += '<p><strong>Resource #:</strong> ' + rElm.id + '</p>';
    contentPh += '<p><strong>Description:</strong></p>';
    contentPh += (rElm.descriptions.length > 0 ? rElm.descriptions[0].title : "");
    contentPh += '<p><strong>Copyright holder:</strong> ' + (rElm.copyrights.length > 0 ? rElm.copyrights[0].copyright_holder.title : "") + '</p>';
    if (rElm.photographer) {
      contentPh += '<p><strong>Photographer:</strong> ' + (rElm.photographer.hasOwnProperty('fullname') ? rElm.photographer.fullname : "") + '</p>';
    };
    contentPh += '</div>';
    contentPh += '</div>';
    contentPh += '</div>';
    contentPh += '</div>';
  });

  contentPh += '</div>';
  contentPh += '<ul id="photo-pagination">';
  contentPh += '<li class="first-page"><a href="' + shanti.photosURL + '&page=1' + '">&lt;&lt;</a></li>';
  contentPh += '<li class="previous-page"><a href="' + shanti.photosURL + '&page=1' + '">&lt;</a></li>';
  contentPh += '<li>PAGE</li>';
  contentPh += '<li><input type="text" value="1" class="page-input"></li>';
  contentPh += '<li>OF ' + data.topic.total_pages + '</li>';
  contentPh += '<li class="next-page"><a href="' + shanti.photosURL + '&page=2' + '">&gt;</a></li>';
  contentPh += '<li class="last-page"><a href="' + shanti.photosURL + '&page=' + data.topic.total_pages + '">&gt;&gt;</a></li>';
  contentPh += '</ul>';
  contentPh += '<div class="paginated-spin"><i class="fa fa-spinner"></i></div>';
  $("#tab-photos").append(contentPh);

  //Add the event listener for the first-page element
  $("li.first-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    $.ajax({
      url: currentTarget,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPhotos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val('1');
      $('li.previous-page a').attr('href', currentTarget);
      var nextTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1) + 2;
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the listener for the previous-page element
  $("li.previous-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    currentTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1);
    var newpage = parseInt($('li input.page-input').val()) - 1;
    if (newpage < 1) { newpage = 1; }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(data.topic.total_pages) ? data.topic.total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPhotos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $(e.currentTarget).attr('href', previousTarget);
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the listener for the next-page element
  $("li.next-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    currentTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1);
    var newpage = parseInt($('li input.page-input').val()) + 1;
    if (newpage > parseInt(data.topic.total_pages)) { newpage = parseInt(data.topic.total_pages); }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(data.topic.total_pages) ? data.topic.total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPhotos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $(e.currentTarget).attr('href', nextTarget);
    });
  });

  //Add the listener for the pager text input element
  $("li input.page-input").change(function(e) {
    e.preventDefault();
    var currentTarget = shanti.photosURL + '&page=';
    var newpage = parseInt($(this).val());
    if (newpage > parseInt(data.topic.total_pages)) { newpage = parseInt(data.topic.total_pages); }
    if (newpage < 1) { newpage = 1; }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(data.topic.total_pages) ? data.topic.total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPhotos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the event listener for the last-page element
  $("li.last-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    var newpage = parseInt(data.topic.total_pages);
    var previousTarget = shanti.photosURL + (newpage - 1);
    $.ajax({
      url: currentTarget,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPhotos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $('li.next-page a').attr('href', currentTarget);
    });
  });
}

//Function to process and show the paginated photos
function paginatedPhotos(data) {
  var paginatedContent = $("#tab-photos .related-photos");

  var contentPh = '';
  $.each(data.topic.media, function(rInd, rElm) {
    contentPh += '<div class="each-photo">';
    contentPh += '<a href="#pid' + rElm.id + '" class="thumbnail" data-toggle="modal">';
    contentPh += '<img src="' + rElm.images[0].url + '" alt="' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '">';
    contentPh += '</a>';
    contentPh += '</div>';

    //Modal for each photo
    contentPh += '<div class="modal fade" tabindex="-1" role="dialog" id="pid' + rElm.id + '">';
    contentPh += '<div class="modal-dialog">';
    contentPh += '<div class="modal-content">';
    contentPh += '<div class="modal-header">';
    contentPh += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    contentPh += '<h4 class="modal-title" id="myModalLabel">' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '</h4>';
    contentPh += '</div>';
    contentPh += '<div class="modal-body">';
    contentPh += '<img src="' + rElm.images[4].url + '" alt="' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '">';
    contentPh += '<p><strong>Resource #:</strong> ' + rElm.id + '</p>';
    contentPh += '<p><strong>Description:</strong></p>';
    contentPh += (rElm.descriptions.length > 0 ? rElm.descriptions[0].title : "");
    contentPh += '<p><strong>Copyright holder:</strong> ' + (rElm.copyrights.length > 0 ? rElm.copyrights[0].copyright_holder.title : "") + '</p>';
    contentPh += '<p><strong>Photographer:</strong> ' + (rElm.hasOwnProperty('photographer') ? rElm.photographer.fullname : "") + '</p>';
    contentPh += '</div>';
    contentPh += '</div>';
    contentPh += '</div>';
    contentPh += '</div>';
  });
  paginatedContent.empty().html(contentPh);
}

//Function to process and show related videos
function relatedVideos(data) {
  console.log(data);

  var monthNames = [ "January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December" ];
  var contentAV = '<div class="related-audio-video">';

  var current_url = $.param.fragment();

  $.each(data.media, function(rInd, rElm) {
    contentAV += '<div class="shanti-thumbnail video col-lg-2 col-md-3 col-sm-4 col-xs-12">';
    contentAV += '<div class="shanti-thumbnail-image shanti-field-video">';
    contentAV += '<a href="#' + current_url + '&nid=' + rElm.nid + '" class="shanti-thumbnail-link">';
    contentAV += '<span class="overlay">';
    contentAV += '<span class="icon"></span>';
    contentAV += '</span>';
    contentAV += '<img src="' + rElm.thumbnail + '/width/360/height/270/type/2/bgcolor/000000' + '" alt="Video" typeof="foaf:Image" class="k-no-rotate">';
    contentAV += '<i class="shanticon-video thumbtype"></i>';
    contentAV += '</a>';
    contentAV += '</div>';
    contentAV += '<div class="shanti-thumbnail-info">';
    contentAV += '<div class="body-wrap">';
    contentAV += '<div class="shanti-thumbnail-field shanti-field-created">';
    contentAV += '<span class="shanti-field-content">';
    var date = new Date(parseInt(rElm.created) * 1000);
    contentAV += date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    contentAV += '</span>';
    contentAV += '<div class="shanti-thumbnail-field shanti-field-title">';
    contentAV += '<span class="field-content">';
    contentAV += '<a href="#' + current_url + '&nid=' + rElm.nid + '" class="shanti-thumbnail-link">';
    contentAV += rElm.title;
    contentAV += '</a>';
    contentAV += '</span>';
    contentAV += '</div>';
    contentAV += '<div class="shanti-thumbnail-field shanti-field-duration">';
    contentAV += '<span class="field-content">' + rElm.duration.formatted + '</span>';
    contentAV += '</div>';
    contentAV += '</div>';
    contentAV += '</div>';
    contentAV += '<div class="footer-wrap">';
    contentAV += '</div>';
    contentAV += '</div>';
    contentAV += '</div>';
  });

  contentAV += '</div>';

  var avURL = Settings.mediabaseURL + '/services/' + Settings.app + '/' + Settings.hash_obj.id + '?rows=12';
  var total_pages = parseInt(data.total / data.rows);

  contentAV += '<ul id="photo-pagination">';
  contentAV += '<li class="first-page"><a href="' + avURL + '&pg=1' + '">&lt;&lt;</a></li>';
  contentAV += '<li class="previous-page"><a href="' + avURL + '&pg=1' + '">&lt;</a></li>';
  contentAV += '<li>PAGE</li>';
  contentAV += '<li><input type="text" value="1" class="page-input"></li>';
  contentAV += '<li>OF ' + total_pages + '</li>';
  contentAV += '<li class="next-page"><a href="' + avURL + '&pg=2' + '">&gt;</a></li>';
  contentAV += '<li class="last-page"><a href="' + avURL + '&page=' + total_pages + '">&gt;&gt;</a></li>';
  contentAV += '</ul>';
  contentAV += '<div class="paginated-spin"><i class="fa fa-spinner"></i></div>';

  $("#tab-audio-video").append(contentAV);

  //Add the event listener for the first-page element
  $("li.first-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    $.ajax({
      url: currentTarget,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedVideos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val('1');
      $('li.previous-page a').attr('href', currentTarget);
      var nextTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1) + 2;
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the listener for the previous-page element
  $("li.previous-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    currentTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1);
    var newpage = parseInt($('li input.page-input').val()) - 1;
    if (newpage < 1) { newpage = 1; }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(total_pages) ? total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedVideos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $(e.currentTarget).attr('href', previousTarget);
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the listener for the next-page element
  $("li.next-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    currentTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1);
    var newpage = parseInt($('li input.page-input').val()) + 1;
    if (newpage > parseInt(total_pages)) { newpage = parseInt(total_pages); }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(total_pages) ? total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedVideos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $(e.currentTarget).attr('href', nextTarget);
    });
  });

  //Add the listener for the pager text input element
  $("li input.page-input").change(function(e) {
    e.preventDefault();
    var currentTarget = avURL + '&pg=';
    var newpage = parseInt($(this).val());
    if (newpage > parseInt(total_pages)) { newpage = parseInt(total_pages); }
    if (newpage < 1) { newpage = 1; }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(total_pages) ? total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedVideos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the event listener for the last-page element
  $("li.last-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    var newpage = parseInt(total_pages);
    var previousTarget = avURL + (newpage - 1);
    $.ajax({
      url: currentTarget,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedVideos)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $('li.next-page a').attr('href', currentTarget);
    });
  });
}

//Function to process and show paginated videos
function paginatedVideos(data) {
  var monthNames = [ "January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December" ];
  var contentAV = '<div class="related-audio-video">';

  var current_url = $.param.fragment();

  $.each(data.media, function(rInd, rElm) {
    contentAV += '<div class="shanti-thumbnail video col-lg-2 col-md-3 col-sm-4 col-xs-12">';
    contentAV += '<div class="shanti-thumbnail-image shanti-field-video">';
    contentAV += '<a href="#' + current_url + '&nid=' + rElm.nid + '" class="shanti-thumbnail-link">';
    contentAV += '<span class="overlay">';
    contentAV += '<span class="icon"></span>';
    contentAV += '</span>';
    contentAV += '<img src="' + rElm.thumbnail + '/width/360/height/270/type/2/bgcolor/000000' + '" alt="Video" typeof="foaf:Image" class="k-no-rotate">';
    contentAV += '<i class="shanticon-video thumbtype"></i>';
    contentAV += '</a>';
    contentAV += '</div>';
    contentAV += '<div class="shanti-thumbnail-info">';
    contentAV += '<div class="body-wrap">';
    contentAV += '<div class="shanti-thumbnail-field shanti-field-created">';
    contentAV += '<span class="shanti-field-content">';
    var date = new Date(parseInt(rElm.created) * 1000);
    contentAV += date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    contentAV += '</span>';
    contentAV += '<div class="shanti-thumbnail-field shanti-field-title">';
    contentAV += '<span class="field-content">';
    contentAV += '<a href="#' + current_url + '&nid=' + rElm.nid + '" class="shanti-thumbnail-link">';
    contentAV += rElm.title;
    contentAV += '</a>';
    contentAV += '</span>';
    contentAV += '</div>';
    contentAV += '<div class="shanti-thumbnail-field shanti-field-duration">';
    contentAV += '<span class="field-content">' + rElm.duration.formatted + '</span>';
    contentAV += '</div>';
    contentAV += '</div>';
    contentAV += '</div>';
    contentAV += '<div class="footer-wrap">';
    contentAV += '</div>';
    contentAV += '</div>';
    contentAV += '</div>';
  });

  contentAV += '</div>';

  $("#tab-audio-video .related-audio-video").empty().html(contentAV);
}

//Function to process and show related texts
function relatedTexts(data) {
  var contentTX = '<div class="related-texts">';

  $.each(data.topic.media, function(rInd, rElm) {
    contentTX += '<div class="each-text">';
    contentTX += '<a href="#pid' + rElm.id + '" class="thumbnail" data-toggle="modal">';
    contentTX += '<img src="' + rElm.images[1].url + '" alt="' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '">';
    contentTX += '</a>';
    contentTX += '</div>';

    //Modal for each photo
    contentTX += '<div class="modal fade" tabindex="-1" role="dialog" id="pid' + rElm.id + '">';
    contentTX += '<div class="modal-dialog">';
    contentTX += '<div class="modal-content">';
    contentTX += '<div class="modal-header">';
    contentTX += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    contentTX += '<h4 class="modal-title" id="myModalLabel">' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '</h4>';
    contentTX += '</div>';
    contentTX += '<div class="modal-body">';
    contentTX += '<img src="' + rElm.images[6].url + '" alt="' + (rElm.captions.length > 0 ? rElm.captions[0].title : "") + '">';
    contentTX += '<p><strong>Resource #:</strong> ' + rElm.id + '</p>';
    contentTX += '</div>';
    contentTX += '</div>';
    contentTX += '</div>';
    contentTX += '</div>';
  });

  contentTX += '</div>';

  $("#tab-texts").append(contentTX);
}

//Function to process and show related places
function relatedPlaces(data) {
  $("#tab-places").empty();

  var contentPl = '<h6>Features Associated with ' + shanti.shanti_data.feature.header + '</h6>';

  contentPl += '<ul class="related-places">';
  $.each(data.features, function(rInd, rElm) {
    contentPl += '<li>';
    contentPl += '<a href="' + Settings.placesPath + '#id=' + rElm.id + '&que=tab-overview">';
    contentPl += rElm.header;
    contentPl += '</a>';
    contentPl += '</li>';
  });
  contentPl += '</ul>';
  contentPl += '<ul id="places-pagination"></ul>';

  var avURL = Settings.placesUrl + '/topics/' + shanti.shanti_data.feature.id + '.json';
  var total_pages = data.total_pages;

  contentPl += '<ul id="photo-pagination">';
  contentPl += '<li class="first-page"><a href="' + avURL + '?page=1' + '">&lt;&lt;</a></li>';
  contentPl += '<li class="previous-page"><a href="' + avURL + '?page=1' + '">&lt;</a></li>';
  contentPl += '<li>PAGE</li>';
  contentPl += '<li><input type="text" value="1" class="page-input"></li>';
  contentPl += '<li>OF ' + total_pages + '</li>';
  contentPl += '<li class="next-page"><a href="' + avURL + '?page=2' + '">&gt;</a></li>';
  contentPl += '<li class="last-page"><a href="' + avURL + '?page=' + total_pages + '">&gt;&gt;</a></li>';
  contentPl += '</ul>';
  contentPl += '<div class="paginated-spin"><i class="fa fa-spinner"></i></div>';

  $("#tab-places").append(contentPl);

  //Add the event listener for the first-page element
  $("li.first-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    $.ajax({
      url: currentTarget,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPlaces)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val('1');
      $('li.previous-page a').attr('href', currentTarget);
      var nextTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1) + 2;
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the listener for the previous-page element
  $("li.previous-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    currentTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1);
    var newpage = parseInt($('li input.page-input').val()) - 1;
    if (newpage < 1) { newpage = 1; }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(total_pages) ? total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPlaces)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $(e.currentTarget).attr('href', previousTarget);
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the listener for the next-page element
  $("li.next-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    currentTarget = currentTarget.substr(0, currentTarget.lastIndexOf('=') + 1);
    var newpage = parseInt($('li input.page-input').val()) + 1;
    if (newpage > parseInt(total_pages)) { newpage = parseInt(total_pages); }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(total_pages) ? total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPlaces)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $(e.currentTarget).attr('href', nextTarget);
    });
  });

  //Add the listener for the pager text input element
  $("li input.page-input").change(function(e) {
    e.preventDefault();
    var currentTarget = avURL + '&pg=';
    var newpage = parseInt($(this).val());
    if (newpage > parseInt(total_pages)) { newpage = parseInt(total_pages); }
    if (newpage < 1) { newpage = 1; }
    var currentURL = currentTarget + newpage;
    var previousTarget = currentTarget + ((newpage - 1) < 1 ? 1 : (newpage - 1));
    var nextTarget = currentTarget + ((newpage + 1) > parseInt(total_pages) ? total_pages : (newpage + 1));
    $.ajax({
      url: currentURL,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPlaces)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $('li.next-page a').attr('href', nextTarget);
    });
  });

  //Add the event listener for the last-page element
  $("li.last-page a").click(function(e) {
    e.preventDefault();
    var currentTarget = $(e.currentTarget).attr('href');
    var newpage = parseInt(total_pages);
    var previousTarget = avURL + (newpage - 1);
    $.ajax({
      url: currentTarget,
      beforeSend: function(xhr) {
        $('.paginated-spin i.fa').addClass('fa-spin');
        $('.paginated-spin').show();
      }
    })
    .done(paginatedPlaces)
    .always(function() {
      $('.paginated-spin i').removeClass('fa-spin');
      $('.paginated-spin').hide();
      $('li input.page-input').val(newpage);
      $('li.previous-page a').attr('href', previousTarget);
      $('li.next-page a').attr('href', currentTarget);
    });
  });
}

//Function to process and show paginated places
function paginatedPlaces(data) {
  var paginatedPlaces = $("#tab-places .related-places");

  var contentPl = '';
  $.each(data.features, function(rInd, rElm) {
    contentPl += '<li>';
    contentPl += '<a href="' + Settings.placesPath + '#id=' + rElm.id + '&que=tab-overview">';
    contentPl += rElm.header;
    contentPl += '</a>';
    contentPl += '</li>';
  });

  paginatedPlaces.empty().html(contentPl);
}

//Function to process and show related Essays
function relatedEssays(data) {
  var contentES = '<div class="related-essays">';

  $.each(data.descriptions, function(rInd, rElm) {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var createdDate = new Date(Date.parse(rElm.created_at));
    var showDate = monthNames[createdDate.getMonth()] + ' ' + createdDate.getDate() + ', ' + createdDate.getFullYear();
    contentES += '<h6>' + rElm.title + ' <small>by ' + rElm.author.fullname + ' (' + showDate + ')</small>' + '</h6>';
    contentES += rElm.content;
  });

  contentES += '</div>';

  $("#tab-essays").append(contentES);

}

//Show related page for the audio/video elements
function showAudioVideoPage(data) {
  var $tabAudioVideo = $('.show-related-pages');
  $tabAudioVideo.empty();
  var audioVideoContent = '';
  audioVideoContent += '<h6>' + data.title + ' </h6>';
  audioVideoContent += '<video controls class="img img-responsive">';
  audioVideoContent += '<source src="http://cdnapi.kaltura.com/p/381832/sp/38183200/playManifest/entryId/' + (data.type == "video" ? data.field_video.und[0].entryid : data.field_audio.und[0].entryid) + '/format/url/protocol/http" type="video/mp4">'
  audioVideoContent += '</video>';
  $tabAudioVideo.append(audioVideoContent);

  $(".content-resources a[href='#" + Settings.hash_obj.que + "']").parent().addClass('active');
}

function processPhotos(mtext) {
  $("ul.nav li a[href='#tab-photos'] .badge").text(mtext.match(/(\d+)/)[1]);
  $(".content-resources ul.nav-pills li.photos").show();
  /*$("#tab-photos").empty();
  $("#tab-photos").append(
    '<p>This is a new test</p>'
  );*/
}

function processVideos(mtext) {
  $("ul.nav li a[href='#tab-audio-video'] .badge").text(mtext.match(/(\d+)/)[1]);
  $(".content-resources ul.nav-pills li.audio-video").show();
  /*$("#tab-photos").empty();
  $("#tab-photos").append(
    '<p>This is a new test</p>'
  );*/
}

function processTexts(mtext) {
  $("ul.nav li a[href='#tab-texts'] .badge").text(mtext.match(/(\d+)/)[1]);
  $(".content-resources ul.nav-pills li.texts").show();
  /*$("#tab-photos").empty();
  $("#tab-photos").append(
    '<p>This is a new test</p>'
  );*/
}

//Function to capitalize first letter
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

