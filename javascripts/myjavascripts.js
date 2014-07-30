var clicked = function($object){
	var $currentValues = $object.css(["background-color", "color"]);
	$object.css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
}

var unclicked = function($object, index){
	$object.css({"background-color": defaultValues[index]["background-color"], "color": defaultValues[index]["color"] });
}

$(function(){

	console.log("hello");

	$contentContainer = $("#contentContainer");
	// think about getting rid of this
	$contentContainer.find($("img")).css({display: "block"});

	$nameContainer = $("#name");

	$nav = $("nav");
	defaultValues = [];
	$nav.children().children().each(function(index){
		defaultValues.push($(this).css(["background-color", "color"]));
	})
	// $nav.children().children().hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});
	
	$nav.children().children().on("click", function(e){
		var self = this;

		$(this).parent().children().each(function(index){
			if ( this === self ) {
				clicked($(this));
			} else {
				unclicked($(this), index);
			}
		});
	});

	$nav.children().children().one("click", function(){

		$(this).parent().animate({
			top: "20px"
		}, 300);

		// ##### TO DO ######
		// Need to find a way to lift up the Nav with the Ul
		// Like I'm attempting below 
		$(this).parent().parent().css({top: "20px"});
		$nameContainer.css({display: "none"});

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