
var detectTorrent = function (hash, cb) {
    var callback = function (e) {
        if(e.data === 'torrent?' + hash + '|true') {
            cb(true);
        } else if(e.data === 'torrent?' + hash + '|false') {
            cb(false);
        } else {
            console.log('invalid message', e);
        }
    };
    if(window.addEventListener) {
        window.addEventListener("message", callback, false);
    } else {
        window.attachEvent('onmessage', callback);
    }
    window.parent.postMessage('torrent?' + hash, "*");
};


$(document).ready(function() {
  var BASE_TORRENT = {
      url: 'http://bundles.bittorrent.com/torrents/BitTorrent-Pixies-Where-Is-My-Mind.torrent',
      hash: '66251CD6DF2E24A8C5468FFE3B951A0CF626A684'
  };
  var GATED_TORRENT = {
      url: 'http://bundles.bittorrent.com/torrents/BitTorrent-Pixies-BAGBOY.torrent',
      hash: '0fa58ed99302bd86a1d0c15bf762f3b7ebe25fff'
  };

  if (top !== self) {
	var current = window.location.pathname.split('/');
	if (current[current.length - 2] == 'current') {
		detectTorrent(BASE_TORRENT.hash, function(exists) {
			if (exists) window.location = "/inclient/yes";
		});
		detectTorrent(GATED_TORRENT.hash, function(unlocked) {
			if (unlocked) window.location = "/inclient/done";
		});
 	}
  }


  //step 1
	var current_url = document.location.search;
	var arg = current_url.substring(1);
	if (arg == "success=1") {
		 $('.BACKGROUND_01').fadeOut(1000);
	    $('.BACKGROUND_02').fadeIn(1000);
		$('.STEP_01').hide();
		$('.STEP_02').show();

		$('.STEP_02').animate({ marginLeft: '0' }, 750, function() {
          $('.PROGRESS_STEP_01').hide();
          $('.PROGRESS_STEP_02').show();
          $('.SELECT_MOBILE_HACK').removeClass('STEP_01_MOBILEHACK');
          $('.SELECT_MOBILE_HACK').addClass('STEP_02_MOBILEHACK');
      });
	} else {
  $('.STEP_01_CTL').bind('click', function() {
    $('.BACKGROUND_01').fadeOut(1000);
    $('.BACKGROUND_02').fadeIn(1000);

    $('.STEP_01').delay(500).animate({
        marginLeft: '-2000px',
        width: '0'
      }, 500, function() {
      $(this).hide();
      $('.background').animate({ "left": '-15%' }, 750, function() {
        //nothing is zen
      });
      $('.STEP_02').show();
      $('.STEP_02').animate({ marginLeft: '0' }, 750, function() {
          $('.PROGRESS_STEP_01').hide();
          $('.PROGRESS_STEP_02').show();
          $('.SELECT_MOBILE_HACK').removeClass('STEP_01_MOBILEHACK');
          $('.SELECT_MOBILE_HACK').addClass('STEP_02_MOBILEHACK');
      });
    });
		$('.NOTIF_BUNDLE_VIDEO').fadeOut(300);
    $('.STEP_02_NOTIF').delay(1500).fadeIn(300);
    setTimeout(function() {
      // If this is not in a frame, then there's no reason to use postmessage just download using window location
      if (top === self) {
        window.location = BASE_TORRENT.url;
      } else {
        window.parent.postMessage('torrent|' + BASE_TORRENT.url, "*");
      }
    },2000);
  });
}
//step 2
var emailEntered;
      $("#mc-embedded-subscribe").click(function() {
               var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
               var emailaddressVal = $("#mce-EMAIL").val();
				
              if(emailaddressVal == '') {	
                $('.STEP_02_NOTIF').fadeOut(100);
		          $('.STEP_02_NOTIF_ERROR').fadeIn(300);
		          $('.FORM_TEXT_FIELD').css({ "border-bottom": "4px solid #ff0000" });
                  return false; 
              }
              else if(!emailReg.test(emailaddressVal)) {						
                $('.STEP_02_NOTIF').fadeOut(100);
		          $('.STEP_02_NOTIF_ERROR').fadeIn(300);
		          $('.FORM_TEXT_FIELD').css({ "border-bottom": "4px solid #ff0000" });
                  return false;
              } 
              else {	
					 
					//dataString = 'email=' + emailaddressVal + '&artistId=' + aID + '&target=' + ct + '&sourceCampaign=' + sc;
					//dataString = 'email=' + emailaddressVal;
					 emailEntered = escape($('#mce-EMAIL').val());
					
		        }
      });
  		$('#subForm').bind('submit', function(e) {
			 var stagingurl = $('.ajaxLink').val();
    		//e.preventDefault();
		     $.ajax({					
                 	 url: stagingurl,
						  dataType: 'jsonp',
						  jsonp: 'jsonp_callback',
	                 data: 'ajax=true&email=' + emailEntered,
				     	  error: function(xhr, status, error) {
				           alert(status);
				            alert(xhr.responseText);
				        },
                 success: function(data) {
					 		//submit event to optimizely
						
							$('.STEP_02_NOTIF').fadeOut(100);
				          $('.STEP_02_NOTIF_ERROR').fadeOut(100);

				          $('.STEP_02').delay(500).animate({
				            marginLeft: '-2000px',
				            width: '0px'
				            }, 500, function() {
				              $(this).hide();
				              $('.background').animate({ "left": '-20%' }, 750, function() {});
				              $('.STEP_03').show();
				              $('.SELECT_MOBILE_HACK').removeClass('STEP_02_MOBILEHACK');
				              $('.SELECT_MOBILE_HACK').addClass('STEP_03_MOBILEHACK');
				              $('.STEP_03').animate({ marginLeft: '0' }, 750, function() {
				                $('.PROGRESS_STEP_02').hide();
				                $('.PROGRESS_STEP_03').show();
				              });
				          });
				          $('.STEP_03_NOTIF').delay(1500).fadeIn(300);
				          setTimeout(function() {
				            // If this is not in a frame, then there's no reason to use postmessage just download using window location
				            if (top === self) window.location = GATED_TORRENT.url;
				            else {
				              window.parent.postMessage('remove|' + BASE_TORRENT.hash, "*");
				              window.parent.postMessage('torrent|' + GATED_TORRENT.url, "*");
				            }
				          }, 2000);
                 }
             });
             return false;
  			});


  //NOTIFICATION CONTROLS
  //cancel, delete, remove
  $('.NOTIF01_CTL_CLOSE').bind('click', function() {
       $('.NOTIF01_ITEM').fadeOut(300);
   });

   $('.NOTIF02_CTL_CLOSE').bind('click', function() {
       $('.NOTIF02_ITEM').fadeOut(300);
   });

  //barber pole progress
  setInterval(function() {
     $('.PROGRESS').animate({
         backgroundPosition: "23px"
     }, 500, 'linear', function() {
        $('.PROGRESS').removeAttr("style");
     });
  }, 500);
		
	//FIXED NAVIGATION
  var window_size = $(window).height();
  var nav_height = 56; //this is the height of the nav
  var num = window_size - nav_height;
  $(window).bind('scroll', function() {
      if ($(window).scrollTop() > num) {
	     $('.bundles_nav').addClass('fixed_nav');
      } else {
         $('.bundles_nav').removeClass('fixed_nav');
      }
   });	
		

	//PLATFORM DETECTION
  setTimeout(function() {
  	//chrome
  	if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) 
  		$('.NOTIF_CHROME').fadeIn(300);
  	//ios
  	if (window.navigator.userAgent.toLowerCase().indexOf('ipad') > -1 || window.navigator.userAgent.toLowerCase().indexOf('iphone') > -1) 
  		$('.NOTIF_IOS').fadeIn(300);
  	//android
  	if (window.navigator.userAgent.toLowerCase().indexOf('android') > -1)
  		$('.NOTIF_ANDROID').fadeIn(300);
  },2000);
	

  //intro video
	setTimeout(function() { 
		$('.NOTIF_BUNDLE_VIDEO').fadeIn(300); 
	},100);
		
	
	//ARTIST INFO
	//open menu	
	$('.ARTIST_INFO_CTL').bind('click', function() {
		$('.ARTIST_INFO_ITM').addClass('artist_info_open');
		$('.ARTIST_INFO_CTL').addClass('info_controls_closed');
		$('.ARTIST_INFO_CTL').hide();
		$('.ARTIST_INFO_CTL_CLOSE').show();
	});
	//close menu
	$('.ARTIST_INFO_CTL_CLOSE').bind('click', function() {
		$('.ARTIST_INFO_ITM').removeClass('artist_info_open');
		$('.ARTIST_INFO_CTL').removeClass('info_controls_closed');
		$('.ARTIST_INFO_CTL_CLOSE').hide();
		$('.ARTIST_INFO_CTL').show();
	});
	//END ARTIST INFO
		
	//COLORBOX
  if ((!$.browser.msie || ($.browser.msie && parseInt($.browser.version, 10) > 8)) && ($(window).width() >= 690) && top === self) {
    $(".youtube").colorbox({iframe:true, innerWidth:"640px", innerHeight:"360px", opacity: 0.4});
    $(".modal_html").colorbox({inline:true, width:"60%", maxWidth:"700px"});
  } else {
    $(".youtube").each(function(){ this.href = this.href.replace('embed/','watch?v='); });
    $(".modal_html").colorbox({inline:true, width:"85%", maxWidth:"700px"});
  }

	//COLORBOX - disable on small devices
	$(window).resize(function() {
	  //update stuff
	  if ($(window).width() < 690 || top !== self) {
	    $.colorbox.remove();
	    $(".modal_html").colorbox({inline:true, width:"85%", maxWidth:"700px"});
	    $.colorbox.resize()	
	    $(".youtube").each(function(){
	      this.href = this.href.replace('embed/','watch?v=');
	    });
	  } else if (!$.browser.msie || ($.browser.msie && parseInt($.browser.version, 10) > 8)) {
	    $(".youtube").colorbox({iframe:true, innerWidth:"640px", innerHeight:"360px", opacity: 0.4});
	    $(".modal_html").colorbox({inline:true, width:"60%", maxWidth:"700px"});
	    $(".youtube").each(function(){
	      this.href = this.href.replace('watch?v=','embed/');
	    });
	  }
	});
	//END COLORBOX
	
	var string = document.URL;
	var exists = string.indexOf("publishForm=yes") > -1;
	if(exists){
		  $('.cboxElement.publish').click();
	}
	
	//NAV "CONTACT" SUBMIT FORM
	$('#SUBFORM_CONTACT').bind('submit', function(e) {
    	e.preventDefault();
		$.getJSON(this.action + "?callback=?", $(this).serialize(),
      		function (data) {
				if (data.Status === 400) {
         			$('.CONTACT_ERROR').show();
         			$('.CONTACT_NAME').css({ "border": "1px solid #ff0000" });
        			} else {
					window.optimizely = window.optimizely || [];
					window.optimizely.push(['trackEvent', 'BUNDLES_WEB_SIGN_UP']);
					$('.CONTACT_ERROR').hide();
					$('.CONTACT_INPUT').hide();
					$('.CONTACT_SUBMIT').hide();
					$('.CONTACT_SUCCESS').show();
					}
      		}
    	);
	});
	
});
