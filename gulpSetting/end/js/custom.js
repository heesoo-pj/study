$(document).ready(function(){

var imgs='';

	for(var i=0; i<200; i++){
		imgs+="<img src='img/pic"+i+".jpg' />"
	};

	$("section").html(imgs);
	$("body").on("mousemove",function(e){

		var wid = $(window).width();
		var posX = e.pageX;
		var $mainImg = $("section>img");
		var percent = Math.floor((posX/wid)*200);

		// 해당 백분율 값을 h3에 출력
		//$("h3").text(percent);

		$mainImg.hide();
		$mainImg.eq(percent).show();

	});


});
