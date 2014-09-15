<?php
//css and js files to include in pages

$path = drupal_get_path('module', 'kmaps_standalone');

$options = array(
  'group' => CSS_DEFAULT,
);

drupal_add_css($path . '/css/bootstrap.min.css', $options);
drupal_add_css($path . '/css/bootstrap-theme.min.css', $options);
drupal_add_css($path . '/src/skin-bootstrap/ui.fancytree.css', $options);
drupal_add_css($path . '/css/utils.css', $options);
drupal_add_css($path . '/css/search-panel.css', $options);
drupal_add_css($path . '/css/main.css', $options);
drupal_add_css($path . '/css/additional.css', $options);
drupal_add_css($path . '/fonts/shanticon/css/style.css', $options);
drupal_add_css($path . '/fonts/font-awesome-4.0.3/css/font-awesome.min.css', $options);

if ($type === 'places') {
  drupal_add_css($path . '/css/places.css', $options);
  drupal_add_css($path . '/css/openlayers.css', $options);
}

$options = array(
  'group' => JS_DEFAULT,
  'scope' => 'footer'
);

drupal_add_js($path . '/js/vendor/jquery.min.js', $options);
drupal_add_js($path . '/js/vendor/jquery-ui.min.js', $options);
drupal_add_js($path . '/js/vendor/bootstrap.min.js', $options);
drupal_add_js($path . '/js/menus/jquery.multilevelpushmenu.min.js', $options);
drupal_add_js($path . '/js/extruder/mbExtruder.js', $options);
drupal_add_js($path . '/src/jquery.fancytree.js', $options);
drupal_add_js($path . '/src/jquery.fancytree.glyph.js', $options);
drupal_add_js($path . '/src/jquery.fancytree.filter.js', $options);
drupal_add_js($path . '/src/jquery.fancytree.edit.js', $options);
drupal_add_js($path . '/js/menus/metisMenu.js', $options);
drupal_add_js($path . '/js/forms/check/icheck.min.js', $options);
drupal_add_js($path . '/js/forms/select/bootstrap-select.min.js', $options);
drupal_add_js($path . '/src/jquery.highlight.js', $options);
drupal_add_js($path . '/js/vendor/jquery.tablesorter.min.js', $options);
drupal_add_js($path . '/src/dataTables.bootstrap.js', $options);
drupal_add_js($path . '/src/trunk8.min.js', $options);
drupal_add_js($path . '/js/menus/jbreadcrumb.js', $options);
drupal_add_js($path . '/js/equalHeights.js', $options);
drupal_add_js($path . '/js/vendor/jquery.ba-bbq.min.js', $options);
drupal_add_js($path . '/js/vendor/bootstrap-paginator.min.js', $options);
drupal_add_js($path . '/js/vendor/bootstrap-paginator.min.js', $options);

if ($type === 'places') {
  drupal_add_js('//maps.googleapis.com/maps/api/js?key=AIzaSyAXpnXkPS39-Bo5ovHQWvyIk6eMgcvc1q4&amp;sensor=false', 'external');
  drupal_add_js('http://openlayers.org/api/OpenLayers.js', 'external');
  drupal_add_js('http://www.thlib.org/places/maps/interactive/scripts/THLWMS.js', 'external');
  drupal_add_js($path . '/js/inset-map.js', $options);
}

drupal_add_js($path . '/js/inset-map.js', $options);
drupal_add_js($path . '/js/search-panel.js', $options);
drupal_add_js($path . '/js/main.js', $options);
drupal_add_js($path . '/js/vendor/modernizr-2.6.2.min.js', $options);

if ($type === 'places') {
  drupal_add_js($path . '/js/kmap_places.js', $options);
}

drupal_add_js($path . '/src/jquery.dataTables.min.js', $options);
?>
<div class="wrap-all">
  <!-- BEGIN Content -->
  <main class="main-wrapper container">
    <article class="main-content" role="main">
     
      <div class="row">   
        <header class="col-xs-12 titlearea">
          <div role="banner">
            <h1 class="page-title"><em><i class="icon <?php $type === 'subjects' ? "shanticon-subjects" : "shanticon-places"; ?>"></i></em><span><?php $type === 'subjects' ? "Collections" : "Earth"; ?></span></h1>
            <nav class="breadwrap" role="navigation">
              <ol class="breadcrumb">
               <li><a href=""><?php $type === 'subjects' ? "Subjects:" : "Places"; ?></a></li>
              </ol>
            </nav>
          </div>
        </header>
      </div>
    
      <!-- Two Columns: content-resources and content-section -->
      <div class="row row-offcanvas row-offcanvas-left">
      
        <!-- Column Resources  -->              
        <aside class="content-resources col-xs-6 col-sm-3 sidebar-offcanvas equal-height">
          <ul class="nav nav-pills nav-stacked">
            <li class="overview"><a href="#tab-overview" data-toggle="pill">
              <i class="icon shanticon-overview"></i>Overview</a>
            </li>
            <li class="subjects"><a href="#tab-subjects" data-toggle="pill">
              <i class="icon shanticon-subjects"></i>Subjects<span class="badge">5</span></a>
            </li>
            <li class="essays"><a href="#tab-essays" data-toggle="pill">
              <i class="icon shanticon-essays"></i>Essays<span class="badge">1</span></a>
            </li>
            <li class="places"><a href="#tab-places" data-toggle="pill">
              <i class="icon shanticon-places"></i>Places<span class="badge">3</span></a>
            </li>
            <li class="agents"><a href="#tab-agents" data-toggle="pill">
              <i class="icon shanticon-agents"></i>Agents<span class="badge">3</span></a>
            </li>
            <li class="events"><a href="#tab-events" data-toggle="pill">
              <i class="icon shanticon-events"></i>Events<span class="badge">3</span></a>
            </li>
            <li class="photos"><a href="#tab-photos" data-toggle="pill">
              <i class="icon shanticon-photos"></i>Photos<span class="badge">3</span></a>
            </li>
            <li class="audio-video"><a href="#tab-audio-video" data-toggle="pill">
              <i class="icon shanticon-audio-video"></i>Audio-Video<span class="badge">3</span></a>
            </li>
            <li class="visuals"><a href="#tab-visuals" data-toggle="pill">
              <i class="icon shanticon-visuals"></i>Visuals<span class="badge">3</span></a>
            </li>
            <li class="texts"><a href="#tab-texts" data-toggle="pill">
              <i class="icon shanticon-texts"></i>Texts<span class="badge">3</span></a>
            </li>
            <li class="maps"><a href="#tab-maps" data-toggle="pill">
              <i class="icon shanticon-maps"></i>Maps<span class="badge">3</span></a>
            </li>
            <li class="community"><a href="#tab-community" data-toggle="pill">
              <i class="icon shanticon-community"></i>Community<span class="badge">3</span></a>
            </li>
            <li class="terms"><a href="#tab-terms" data-toggle="pill">
              <i class="icon shanticon-terms"></i>Terms<span class="badge">3</span></a>
            </li>
            <li class="sources"><a href="#tab-sources" data-toggle="pill">
              <i class="icon shanticon-sources"></i>Sources<span class="badge">3</span></a>
            </li>
          </ul> 
        </aside> 
      
        <!-- Column Main  -->                   
        <section  class="content-section col-xs-12 col-sm-9 equal-height">
          <!-- button for responsive menu toggle -->
          <button type="button" class="btn btn-default btn-xs visible-xs view-resources" data-toggle="offcanvas">
            <i class="fa"></i>
            <span class="header">RESOURCES</span>
            <span class="badge">13489</span>
            <i class="icon"></i>
          </button>
          
          <div class="tab-content">
          
            <article class="tab-pane" id="tab-overview">
            </article>

            <article class="tab-pane" id="tab-subjects"> 
            </article>

            <article class="tab-pane" id="tab-essays">
            </article>

            <article class="tab-pane" id="tab-places">
            </article>
                            
            <article class="tab-pane" id="tab-agents">
            </article>

            <article class="tab-pane" id="tab-events">
            </article>

            <article class="tab-pane" id="tab-photos">
            </article>

            <article class="tab-pane" id="tab-audio-video">
            </article>

            <article class="tab-pane" id="tab-visuals">
            </article>

            <article class="tab-pane" id="tab-texts">
            </article>

            <article class="tab-pane" id="tab-maps">
            </article>

            <article class="tab-pane" id="tab-community">
            </article>

            <article class="tab-pane" id="tab-terms">
            </article>

            <article class="tab-pane" id="tab-sources">
            </article>

            <article class="show-related-pages">
            </article>
          
          </div><!-- END tab-content -->
        </section><!-- END content-section -->                
      </div><!-- END row -->    
    </article><!-- END main-content -->
 
 
 
 
 
      <!-- BEGIN Search Panel --> 
      <section id="kmaps-search" role="search">               
          <!-- BEGIN Input section -->                    
          <section class="input-section" style="display:none;">                   
            <form class="form">
             <fieldset>                       
                <div class="search-group">                        
                    <div class="input-group">
                        <input type="text" class="form-control kms" id="searchform" placeholder="Enter Search...">
                        <span class="input-group-btn">
                          <button type="button" class="btn btn-default" id="searchbutton"><i class="icon"></i></button>
                          <button type="reset" class="btn searchreset"><i class="icon"></i></button>
                        </span>
                    </div>
                    
                   <!-- search scope -->
                   <div class="form-group">
                       <label class="checkbox-inline"><input type="checkbox" id="summaryscope" name="summary-scope" checked="checked" data-value="summaries">Summaries</label>
                       <label class="checkbox-inline" ><input type="checkbox" id="essayscope" name="essay-scope" data-value="essays">Essays</label>            
                       <a href="#" class="advanced-link toggle-link"><i class="icon"></i>Advanced</a>           
                   </div>
               </div><!-- END search group -->
               
               <div id="notification-wrapper"></div>
                    
               <section class="advanced-view" style="display:none;">                                              
                      <div class="form-group"> 
                        <label class="radio-inline" for="radios-0">
                          <input type="radio" name="radios" id="radios-0" value="1" checked="checked">
                            All Text</label> 
                        <label class="radio-inline" for="radios-1">
                          <input type="radio" name="radios" id="radios-1" value="2">
                            Name </label> 
                      </div>
                                                  
                      <div class="form-group">
                        <label class="radio-inline" for="radios-2">
                          <input type="radio" name="radios2" id="radios-2" value="3" checked="checked">
                            Contains</label> 
                        <label class="radio-inline" for="radios-3">
                          <input type="radio" name="radios2" id="radios-3" value="4">
                            Starts With</label>
                        <label class="radio-inline" for="radios-4">
                          <input type="radio" name="radios2" id="radios-4" value="5">
                            Exactly</label>                             
                      </div>
 
   
 
                      <!-- feature 1 type -->
                      <div class="form-group advanced-input feature-group dropdown" style="display:none;">
                            <span class="filter type"><label>Filter:</label> <span id="matches1"></span></span>                                               
                            <input class="form-control feature-type" id="feature-type" name="feature-type" type="text" placeholder="Filter by Feature Type">  
                            <button id="feature1a-reset" class="feature-reset"><i class="icon"></i></button>
                                                  
                            <div class="dropdown-menu feature-menu dropdown-type">
                                <div class="tree-wrap"> 
    
                                  <div class="feature-container">                             
                                    <div id="feature-tree1"></div> <!-- features tree, under construction -->                              
                                  </div> 
                                                              
                                  <div class="feature-submit">
                                    <button type="button" id="feature1-select" class="btn btn-default">Select</button>
                                    <button type="reset" id="feature1b-reset" class="btn btn-default clear-form">Cancel<i class="icon"></i></button>
                                  </div>
                                                              
                                </div>                      
                            </div> <!-- END dropdown-menu -->                        
                      </div> <!-- END feature-group -->
    
    
                      <!-- feature 2 subject -->
                      <div class="form-group advanced-input feature-group dropdown" style="border-top:none;display:none;">
                            <span class="filter subject"><label>Filter:</label> <span id="matches2"></span></span>                                               
                            <input class="form-control feature-subject" id="feature-subject" name="feature-subject" type="text" placeholder="Filter by Feature Subject">  
                            <button id="feature2a-reset" class="feature-reset"><i class="icon"></i></button>
                                                  
                            <div class="dropdown-menu feature-menu dropdown-subject">
                                <div class="tree-wrap"> 
    
                                  <div class="feature-container">                             
                                    <div id="feature-tree2"></div> <!-- features tree, under construction -->                              
                                  </div> 
                                                              
                                  <div class="feature-submit">
                                    <button type="button" id="feature2-select" class="btn btn-default">Select</button>
                                    <button type="reset" id="feature2b-reset" class="btn btn-default clear-form">Cancel<i class="icon"></i></button>
                                  </div>
                                                              
                                </div>                      
                            </div> <!-- END dropdown-menu -->                       
                      </div> <!-- END feature-group -->
                      
    
                      <!-- feature 3 region -->
                      <div class="form-group advanced-input feature-group dropdown" style="border-top:none;display:none;">
                            <span class="filter region"><label>Filter:</label> <span id="matches3"></span></span>                                               
                            <input class="form-control feature-region" id="feature-region" name="feature-region" type="text" placeholder="Filter by Feature Region">  
                            <button id="feature3a-reset" class="feature-reset"><i class="icon"></i></button>
                                                  
                            <div class="dropdown-menu feature-menu dropdown-region">
                                <div class="tree-wrap"> 
    
                                  <div class="feature-container">                             
                                    <div id="feature-tree3"></div> <!-- features tree, under construction -->                              
                                  </div> 
                                                              
                                  <div class="feature-submit">
                                    <button type="button" id="feature3-select" class="btn btn-default">Select</button>
                                    <button type="reset" id="feature3b-reset" class="btn btn-default clear-form">Cancel<i class="icon"></i></button>
                                  </div>
                                                              
                                </div>                      
                            </div> <!-- END dropdown-menu -->                        
                      </div> <!-- END feature-group -->
 
                  
                      <div class="form-group advanced-input select-type"> 
                          <span>Show only results containing:</span>
                            <select class="selectpicker" id="selector1" name="selector1" data-selected-text-format="count>2" data-header="Select one or more..." data-width="100%" multiple >                         
                              <option data-icon="shanticon-essays">Essays</option>
                              <option data-icon="shanticon-places">Places</option>
                              <option data-icon="shanticon-agents">Agents</option>
                              <option data-icon="shanticon-events">Events</option>
                              <option data-icon="shanticon-photos">Photos</option>
                              <option data-icon="shanticon-audio-video">Audio-Video</option>
                              <option data-icon="shanticon-visuals">Visuals</option>
                              <option data-icon="shanticon-texts">Texts</option>
                              <option data-icon="shanticon-terms">Terms</option>
                              <option data-icon="shanticon-sources">Sources</option>
                            </select>
                      </div>
                                        
               </section><!-- END advanced section -->
             </fieldset>         
           </form>
          </section> <!-- END input section -->
    
          <!-- BEGIN view section -->                                  
          <section class="view-section">             
            <ul class="nav nav-tabs">
              <li class="treeview active"><a href=".treeview" data-toggle="tab"><i class="icon shanticon-tree"></i>Tree</a></li>
              <li class="listview"><a href=".listview" data-toggle="tab"><i class="icon shanticon-list"></i>List</a></li>
            </ul>           
            <div class="tab-content">
                              
              <!-- TAB - tree view -->
              <div class="treeview tab-pane active">        
                  <div id="tree" class="view-wrap"><!-- view-wrap controls tree container height --></div>              
              </div>          
              <!-- TAB - list view -->
              <div class="listview tab-pane">   
                <div class="view-wrap"> <!-- view-wrap controls container height -->              
                  <div class="table-responsive">
                     <table class="table table-condensed table-results">
                      <thead>
                          <tr>
                            <th>Name</th>
                            <th>Feature Type</th>
                          </tr>
                      </thead>
                      <tbody></tbody>
                     </table>                                   
                  </div>
                </div>
              </div>
            </div>                        
          </section><!-- END view section -->
      </section><!-- END kmaps-search -->
   
    <a href="#" class="back-to-top"><i class="icon"></i></a>    
  </main><!-- END container -->
</div>