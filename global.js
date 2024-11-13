/*Code by android developers start here*/

var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});
});

function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
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

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
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

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	}
	
}else {
	

	if(page_id <= 1){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 2){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
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


	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
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

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
//step 6:-
//console.log("++++++++pg_id++++"+pg_id+"+++++++currentslide++++++"+localStorage.getItem("currentslide")+"++++++previousslide++++++"+localStorage.getItem("previousslide"));
		
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide1/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide1/s2.png"/></div><div class="s3"><img src="slide1/s3.png"/></div><div class="s4"><img src="slide1/s4.png"/></div><div class="s5"><img src="slide1/s5.png"/></div><div class="s6"><img src="slide1/s6.png"/></div><div class="s7"><img src="slide1/s7.png"/></div><div class="s8"><img src="slide1/s8.png"/></div><div class="s9"><img src="slide1/s9.png"/></div><div class="s10"><img src="slide1/s10.png"/></div><div class="s11"><img src="slide1/s11.png"/></div><div class="s12"><img src="slide1/s12.png"/></div><div class="s13"><img src="slide1/s13.png"/></div><div class="s14"><img src="slide1/s14.png"/></div><div class="s15"><img src="slide1/s15.png"/></div><div class="s16"><img src="slide1/s16.png"/></div><div class="s17w"><div class="s17"><img src="slide1/s17.png"/></div></div><div class="s18w"><div class="s18"><img src="slide1/s18.png"/></div></div><div class="s19"><img src="slide1/s19.png"/></div><div class="s20w"><div class="s20"><img src="slide1/s20.png"/></div><div class="s21"><img src="slide1/s21.png"/></div></div><div class="s22"><img src="slide1/s22.png"/></div><div class="s23"><img src="slide1/s23.png"/></div><div class="s24"><img src="slide1/s24.png"/></div><div class="hit1" onclick="hit1();"></div><div class="hit2" onclick="hit2();"></div><div class="hit3" onclick="hit3();"></div>';
	break;
}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}


function open_page(url,page_id){
	 //alert("===openpage====");
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

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 }
	  checkClickThrough();
	}

	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
	document.getElementById("click_through").innerHTML='';
		}
    if(currentslide == 2){
	document.getElementById("click_through").innerHTML='';
		}

	}

	function checkBtns(refNum){
		switch(refNum){
			case 1:
			open_page('',1);
            break;
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})

/*--------------------- animation javascript -----------------------*/

function hit_pop1() {
	$('.hit_1').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop1').css("display","none");
}

function hit_pop2() {
	$('.hit_2').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop2').css("display","none");
}

function hit_pop3() {
	$('.hit_3').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop3').css("display","none");
}

function hit_pop4() {
	$('.hit_4').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop4').css("display","none");
}

function hit_pop5() {
	$('.hit_5').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop5').css("display","none");
}

function hit_pop6() {
	$('.hit_6').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop6').css("display","none");
}

function hit_pop7() {
	$('.hit_7').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop7').css("display","none");
}

function hit_close1() {
	$('.hit_1').css("display","none");
	$('.hit_2').css("display","none");
	$('.hit_3').css("display","none");
	$('.hit_4').css("display","none");
	$('.hit_5').css("display","none");
	$('.hit_6').css("display","none");
	$('.hit_7').css("display","none");
	$('.hit_pop1').css("display","block");
	$('.hit_pop2').css("display","block");
	$('.hit_pop3').css("display","block");
	$('.hit_pop4').css("display","block");
	$('.hit_pop5').css("display","block");
	$('.hit_pop6').css("display","block");
	$('.hit_pop7').css("display","block");
	$('.hit_close1').css("display","none");
}

function takeCover() {
		open_page("",1);
}

function hit1() {
	$('.hit1').css("display","none");
	$(".s4").addClass("fadeOut");
	$('.s7').css("display","block");
	$('.s10').css("display","block");
	$('.s14').css("display","none");
	$('.s15').css("display","block");
	$('.s16').css("display","block");
	$('.s17w').css("display","block");
	$('.s17').css("display","block");
	setTimeout(function(){ 
		$('.hit2').css("display","block");
	}, 3500);
}

function hit2() {
	$('.hit2').css("display","none");
	$('.s15').css("display","none");
	$('.s16').css("display","none");
	$('.s18w').css("display","block");
	$('.s18').css("display","block");
	$('.s19').css("display","block");
	$('.s20w').css("display","block");
	$('.s20').css("display","block");
	setTimeout(function(){ 
		$('.s21').fadeIn();
		$('.hit3').css("display","block");
	}, 4200);
}

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