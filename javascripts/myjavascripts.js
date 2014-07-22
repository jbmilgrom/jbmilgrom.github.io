var inOrOut = function(){

}

$(function(){

	console.log("hello");

	$contentContainer = $("#contentContainer");
	$contentContainer.find($("img")).css({display: "block"});

	$nav = $("nav");

	$nav.children().children().on("mouseover", function(){
		console.log("child");
		var $currentValues = $(this).css(["background-color", "color"]);
		$(this).css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
	});

	$nav.find($(".projects")).on("click", function(e){
		e.preventDefault();
		console.log(e);
		console.log("prjects log click");
		console.log($(this));
	});

	$nav.find($(".contact")).on("click", function(e){
		console.log(e);
		e.preventDefault();
		$contentContainer.find(".contact").css({display: "block"});
		$contentContainer.find("img").css({display: "none"});
	});
	

})