/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId = parseInt(localStorage.getItem('currentcontent'));
//ends
/* var currentContentNSlide ='';

//custom slides changes begins here....

//alert("++++++++++++"+custcomslideflag1+"+++++++custcomslideid+++++++"+custcomslideid1);
  if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
    var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
    //step 2:

    currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
    //step 2 ends here
    localStorage.setItem("current",currentContentNSlide);
    localStorage.setItem("currentslide",custcomslideid1);

  }else{
    //step 3 :
    currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
    //step 3 ends here
    localStorage.setItem("current",currentContentNSlide);
    localStorage.setItem("currentslide",'1');
  }
  
//custom slides changes ends here....

/* currentContentNSlide = contentName+"_"+'1';
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",'1'); */
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {
  if (e.type == "touchstart") {
    if (e.touches.length == 1) {
      // one finger touch
      var touch = e.touches[0];
      startLoc = { x: touch.pageX, y: touch.pageY };
    }
  } else if (e.type == "touchmove") {
    if (startLoc) {
      var touch = e.touches[0];

      if (
        Math.abs(startLoc.x - touch.pageX) > Math.abs(startLoc.y - touch.pageY)
      ) {
        e.preventDefault();
      }
      startLoc = null;
    }
  }
}
/*Code by android developers ends here*/
$(document).ready(function () {
  var ua = navigator.userAgent;
  //var event = "touchstart";
  var event = ua.match(/Ipad/i) ? "touchstart" : "click";

  $(".left_arrow").click(function (event) {
    go_nav('b');
  });

  $(".right_arrow").click(function (event) {
    go_nav('f');
  });

  $(".slides").click(function () {
    var slideNum = $(this).index() + 1;
    console.log(slideNum);
    open_page("", slideNum);
  });

  $(".reference").removeClass("active");

  $('.reference').on('swipeleft swiperight', function (event) {
    event.stopPropagation();
  });

  $(".box_btn").bind("click", function () {
    $(".reference").toggleClass("active");
  });

  currentSlide();

  $("#main_content").swipe({
    swipeLeft: function (event, direction, distance, duration, fingerCount) {
      /* //step 4:-
    console.log("swipeleft"+localStorage.getItem("currentslide"));
    localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
    //step 4 ends here */
      //alert("swipeleft");
      //myconsole("swipeleft");
      var page_id = parseInt($("#wrapper").attr("rel"));
      var last_page_id = $(".slides").length;
      var slide_jumper_open = $(".reference").hasClass("active");
      if (page_id == last_page_id + 1) {
        return
      } else {
        go_nav('f');
      }
    },

    swipeRight: function (event, direction, distance, duration, fingerCount) {
      /* //step 5:-
    console.log("swiperight"+localStorage.getItem("currentslide"));
    localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
    //step 5 ends here  */
      //alert("swiperight");
      //myconsole("swiperight");
      var page_id = parseInt($("#wrapper").attr("rel"));
      var slide_jumper_open = $(".reference").hasClass("active");

      if (page_id == 0) {
        //console.log("First Slide");
        //myconsole("First Slide");
        return
      } else {
        go_nav('b');
      }
    },

    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 0
  });
});

function go_nav(direction) {
  var page_id = parseInt($("#wrapper").attr("rel"));

  var flag = 0;
  if (direction == 'b') {
    if (page_id >= 0) {
      page_id = page_id - 1;
      //alert(page_id);
      //console.log(page_id);
      if (page_id == 0) {
        flag = 2;
      }
    }
   if (flag == 2) {
      localStorage.setItem("gotoNextPrevBrand", 2); //if one than next if 2 than prev
      //flag == 0;
      var objectData = {
        "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
      };
      var params = {
        "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
      };
       //window.messageHandler.postMessage(JSON.stringify(params));

      //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    } else {
      localStorage.setItem("gotoNextPrevBrand", 0);
      var objectData = {
        "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
      };
      var params = {
       "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
      };
       //window.messageHandler.postMessage(JSON.stringify(params));
    }
  } else {
    if (page_id <= 6) {
      page_id = page_id + 1;
      //alert(page_id);
      if (page_id == 7) {
        flag = 1;
      }
    }
     if (flag == 1) {
      localStorage.setItem("gotoNextPrevBrand", 1); //if one than next if 2 than prev
      flag == 0;
      var objectData = {
        "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
      };
      var params = {
        "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
      };
       //window.messageHandler.postMessage(JSON.stringify(params));

      // window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    } else {
      localStorage.setItem("gotoNextPrevBrand", 0);
      var objectData = {
       "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
      };
      var params = {
        "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
      };
       //window.messageHandler.postMessage(JSON.stringify(params));
    }
  }

  /* //step 8:
currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
//step 8 ends here
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",page_id); */

  $("#wrapper").attr("rel", page_id);

  var content = "";
  if (flag == 0) {
    var pg_content = set_pg_content(page_id);

    $("#main_content").html(pg_content);
  }
  //console.log("pg : "+page_id);
  if (page_id == 4) {
    $(".box2").click(function (event) {
      open_page("", 5);
    });
    $(".box3").click(function (event) {
      open_page("", 6);
    });
    $(".box4").click(function (event) {
      open_page("", 7);
    });
    $(".box5").click(function (event) {
      open_page("", 8);
    });
    $(".box6").click(function (event) {
      open_page("", 9);
    });
    $(".box7").click(function (event) {
      open_page("", 10);
    });
    $(".box8").click(function (event) {
      open_page("", 11);
    });
  }
  checkClickThrough();
}

function set_pg_content(pg_id) {
  $(".reference").removeClass("active");
  currentSlide();
  var selectedContentPath = '';
  switch (pg_id) {
   
		   case 1:
		   content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide1/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide1/s2.png"/></div><div class="s3"><img src="slide1/s3.png"/></div><div class="s4"><img src="slide1/s4.png"/></div><div class="s5"><img src="slide1/s5.png"/></div><div class="s6"><img src="slide1/s6.png"/></div><div class="s7"><img src="slide1/s7.png"/></div><div class="s8"><img src="slide1/s8.png"/></div><div class="s9"><img src="slide1/s9.png"/></div><div class="s10"><img src="slide1/s10.png"/></div><div class="s11"><img src="slide1/s11.png"/></div><div class="s12"><img src="slide1/s12.png"/></div><div class="s13"><img src="slide1/s13.png"/></div><div class="s14"><img src="slide1/s14.png"/></div><div class="s15"><img src="slide1/s15.png"/></div><div class="s16"><img src="slide1/s16.png"/></div><div class="s17w"><div class="s17"><img src="slide1/s17.png"/></div></div><div class="s18w"><div class="s18"><img src="slide1/s18.png"/></div></div><div class="s19"><img src="slide1/s19.png"/></div><div class="s20w"><div class="s20"><img src="slide1/s20.png"/></div><div class="s21"><img src="slide1/s21.png"/></div></div><div class="s22"><img src="slide1/s22.png"/></div><div class="s23"><img src="slide1/s23.png"/></div><div class="s24"><img src="slide1/s24.png"/></div><div class="hit1" onclick="hit1();"></div><div class="hit2" onclick="hit2();"></div><div class="hit3" onclick="hit3();"></div>';
		   break;
           case 2:
           content ='<link rel="stylesheet" type="text/css" href="slide2/slide2.css" media="screen"/><div class="background"><img src="slide2/1.png" width="1080" height="810"><div class="jump2" onclick=jump2()></div></div>';
           break;
           case 3:
           content='<link rel="stylesheet" type="text/css" href="slide3/slide3.css" media="screen"/> <div class="background"><img src="slide3/1.png" width="1080" height="810"/></div><div class="title2" class="frameopen" onclick="framepop()"><div class="popupImgclick"></div></div><div class="frame"><img src="slide3/3.png" width="1080"></div><div class="frameclose" onclick="frameclose()"><img src="close2.png"/></div>';
           break;
           case 4:
           content='<link rel="stylesheet" type="text/css" href="slide4/slide4.css" media="screen"/> <div class="background"><img src="slide4/bg.png" width="1080" height="810"/></div>  <div class="title1"><img src="slide4/1.png"/></div> <div class="title2"><img src="slide4/2.png"/></div> <div class="title3"><img src="slide4/3.png"/></div> <div class="title4"><img src="slide4/4.png"/></div> <div class="title5"><img src="slide4/5.png"/></div>';
           break;        
           case 5:
           content ='<link rel="stylesheet" type="text/css" href="slide5/slide5.css" media="screen"/><div class="background"><img src="slide5/1.png" width="1080" height="810"></div><div class="title2" class="frameopen" onclick="framepop()"></div><div class="frame"><img src="slide5/pop1.png" width="1080"></div><div class="frameclose" onclick="frameclose()"><img src="close2.png"/></div><div class="pop2" onclick="popup2()"></div><div class="pop2open"><img src="slide5/pop2.png" width="1080"><div class="graphpop"><img src="slide5/pop1a.png"/></div></div><div class="frameclose2" onclick="pop2close()"><img src="close2.png"/></div>';
           break;       
           case 6:
           content ='<link rel="stylesheet" type="text/css" href="slide6/slide6.css" media="screen"/><div class="background"><img src="slide6/1.png" width="1080" height="810"></div><div class="pop5" onclick="popup5()"></div><div class="pop5open"><img src="slide6/pop5.png" width="1080"></div><div class="frameclose5" onclick="pop5close()"><img src="close2.png"/></div>';
           break;
      }

  return content;
}

function showDiv() {
  document.getElementById("welcomeDiv").style.display = "block";
}
function showDiv2() {
  document.getElementById("welcomeDiv2").style.display = "block";
}

function open_page(url, page_id) {
 localStorage.getItem('currentbrand');
    localStorage.getItem('currentcontent');
    localStorage.getItem('currentcontentbrandId');
    localStorage.getItem('current');
  localStorage.setItem("gotoNextPrevBrand" ,0);
  //alert("====currentbrand======"+localStorage.getItem('currentbrand'));
  //alert("====currentcontent======"+localStorage.getItem('currentcontent'));
  //alert("====currentcontentbrandId======"+localStorage.getItem('currentcontentbrandId'));
  //alert("====current======"+localStorage.getItem('current'));
  //alert("====previousslide======"+localStorage.getItem("previousslide"));
  
 
  //alert("====page_id======"+page_id);
    var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


     //window.messageHandler.postMessage(JSON.stringify(params)); 

  /* // alert(page_id);
  //step 10:
  if (typeof(localStorage.getItem("currentslide"))!='undefined'){
    //to checked previous slide has god end time...
    var slideid=localStorage.getItem("currentslide");
    toCaptureTime(slideid);
    
  }
  
  // toCaptureTime(page_id);
   localStorage.setItem("currentslide",page_id);
   currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
   localStorage.setItem("current",currentContentNSlide);
  //step 10 ends here */

  $("#wrapper").attr("rel", page_id);
  var content = "";
  var pg_content = set_pg_content(page_id);

  $("#main_content").html(pg_content);

  if (page_id == 4) {
    $(".box2").click(function (event) {
      open_page("", 5);
    });
    $(".box3").click(function (event) {
      open_page("", 6);
    });
    $(".box4").click(function (event) {
      open_page("", 7);
    });
    $(".box5").click(function (event) {
      open_page("", 8);
    });
    $(".box6").click(function (event) {
      open_page("", 9);
    });
    $(".box7").click(function (event) {
      open_page("", 10);
    });
    $(".box8").click(function (event) {
      open_page("", 11);
    });
  }
  checkClickThrough();
}

function checkClickThrough() {
  var currentslide = localStorage.getItem("currentslide");
  //alert(currentslide);
  document.getElementById("click_through").innerHTML = "";

  if (currentslide == 1) {
    document.getElementById("click_through").innerHTML = "";
  }
  if (currentslide == 2) {
    document.getElementById("click_through").innerHTML = "";
  }
}

function checkBtns(refNum) {
  switch (refNum) {
    case 1:
      open_page("", 1);
      break;
  }
}

function currentSlide() {
  var curr_id = parseInt($("#wrapper").attr("rel"));
  $(".slides").removeClass("active");
  $(".slides:nth-child(" + curr_id + ")").addClass("active");
}

var ln = 0;
function myconsole(msg) {
  var oldMsg = "</br>" + ln + ". " + $("#myconsole").html();
  ln++;
  $("#myconsole").html(msg + oldMsg);
}

function currentTimeInDatabaseFormat() {
  //to get current time in dd-mm-yyyy hh:mm:ss
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  month = parseInt(month) + 1;
  if (month.toString().length == 1) {
    month = "0" + month;
  }

  var date = new Date().getDate();
  if (date.toString().length == 1) {
    date = "0" + date;
  }

  var hour = new Date().getHours();
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }

  var minutes = new Date().getMinutes();
  if (minutes.toString().length == 1) {
    minutes = "0" + minutes;
  }

  var seconds = new Date().getSeconds();
  if (seconds.toString().length == 1) {
    seconds = "0" + seconds;
  }

  var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
  return duration;
}

$(document).ready(function () {
  $("body").on("click", ".touchbtn", function () {
    $(".right_arrow").trigger("click");
  });

  $(document).on("click", ".btnshow", function () {
    //alert('hi')
    $(".touchbtn").css("display", "block");
  });

  




});
/*--------------------- animation javascript -----------------------*/

function s9_pop1() {
  $('.s9_1').css("display","block");
  $('.s9_c1ose1').css("display","block");
  $('.s9_pop1').css("display","none");
}
/*--------------------- animation javascript -----------------------*/

function jump2(){
  go_nav('f');
}

function framepop() {
  
  setTimeout(function () {
    $(".frame").show();
    $(".frameclose").show();
    $(".frameopen").hide();
    $(".girl1image").hide();
    $(".background").show()
    $("#frameopeneded").show();
    
  }, 100);
}

function frameclose() {
  setTimeout(function () {
    $(".frame").hide();
    $(".frameclose").hide();
    $(".frameopen").show();
    $(".girl1image").show();
    $(".background").show()
    $("#frameopeneded").show();
  }, 100);
}

function framepopup2() {
  
  setTimeout(function () {
    $(".frame").show();
    $(".frameclose").show();
    $(".frameopen").hide();
    $(".girl1image").hide();
    $(".background").show()
    $("#frameopeneded").show();
    
  }, 100);
}

function framepop2close() {
  setTimeout(function () {
    $(".frame").hide();
    $(".frameclose").hide();
    $(".frameopen").show();
    $(".girl1image").show();
    $(".background").show()
    $("#frameopeneded").show();
  }, 100);
}


function framepop2() {
  setTimeout(function () {
    $(".title1").show();
    $(".title2").show();
  }, 100);
}

function popup2() {
  
  setTimeout(function () {
    $(".pop2open").show();
   $(".frameclose2").show();
  $(".graphpop img").delay(500).animate({ "opacity": "1", "animation-duration": "1s" }, 1, function () {
          $(".graphpop img").animate({ height: "261px" },500)
        });
    
  }, 100);
}

function pop2close() {
  
  setTimeout(function () {
    $(".pop2open").hide();
    $(".frameclose2").hide();
  $(".graphpop img").animate({ height: "0" },500);
  }, 100);
}


// another popup in slide23

function framepopped() {
  setTimeout(function () {
    $(".frame2").show();
    $(".frameclose2").show();
    $("#frameopened").hide();
    $("#frameopeneded").show();
    $(".background").show()
    $(".title2").show();
    $(".title1").show();
  }, 100);
}

function frameclose2() {
  setTimeout(function () {
    $(".frame2").hide();
    $(".frameclose2").hide();
    $("#frameopened").show();
    $("#frameopeneded").show();
  }, 100);
}

// another popup in slide23

function framepoppeded() {
  setTimeout(function () {
    $(".frame3").show();
    $(".frameclose3").show();
    $("#frameopeneded").hide();
     $(".title2").show();
     $(".title3").show();
    
  }, 100);
}

function frameclose3() {
  setTimeout(function () {
    $(".frame3").hide();
    $(".frameclose3").hide();
    $("#frameopeneded").show();
  
  }, 100);
}

// 4th popup

function framepoppeded2() {
  setTimeout(function () {
    $(".frame4").show();
    $(".frameclose4").show();
    $("#frameopeneded2").hide();
    $(".title4").show();
   
    
  }, 100);
}

function frameclose4() {
  setTimeout(function () {
    


    $(".frame4").hide();
    $(".frameclose4").hide();
    $("#frameopeneded2").show();
  
  }, 100);
}



function popup5() {
  
  setTimeout(function () {
    $(".pop5open").show();
   $(".frameclose5").show();
   
    
  }, 100);
}

function pop5close() {
  setTimeout(function () {
    $(".pop5open").hide();
    $(".frameclose5").hide();
  
  }, 100);
}






/*--------------------- animation javascript -----------------------*/

function hit3() {
	$('.s21').fadeOut();
	$('.hit3').css("display","none");
	$('.s20w').addClass("flipOutX");
	setTimeout(function(){
		$(".s5").addClass("fadeOutFast");
		$(".s6").addClass("fadeOutFast");
		$('.s8').css("display","block");
		$('.s9').css("display","block");
		$('.s11').css("display","block");
		$('.s12').css("display","block");
		$('.s19').css("display","none");
	}, 1500);
	$('.s22').css("display","block");
	$('.s23').css("display","block");
	$('.s24').css("display","block");
}

window.onload = function(){
   setInterval(function(){
       $('.s20w').css("display","block");
   }, 12000);
   setInterval(function(){
       $('.s21').css("display","block");
       $('.hit3').css("display","block");
   }, 13000);
};