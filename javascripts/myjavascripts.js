var clicked = function($object){
	var $currentValues = $object.css(["background-color", "color"]);
	$object.css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
}

var unclicked = function($object, index){
	$object.css({"background-color": defaultValues[index]["background-color"], "color": defaultValues[index]["color"] });
}

var changeAttribute = function($object, attribute, newValue){
	var obj = {};
	obj[attribute] = newValue; 
	$object.css(obj);
}

var switcheroo = function($object, attribute, valueOne, valueTwo){
	var currentValue = $object.css(attribute);

	if (currentValue === valueOne) {
		changeAttribute($object, attribute, valueTwo);
	} else {
		changeAttribute($object, attribute, valueOne);
	}

}

var scrollToAnim = function(text){
	$('html, body').animate({
		scrollTop: $("#" + text).offset().top - $intro.offset().top
	}, 1000);
}

$(function(){


	$nav = $("nav");
	$intro = $("#introduction");


	var navBackColor = $nav.children().last().children().first().css("background-color");
	var navFontColor = $nav.children().last().children().first().css("color");
	var navBackColorNew = "#45C2C6";
	var navFontColorNew = navBackColor;

	var headBackColor = $nav.children().first().find("li.image").css("background-color");

	defaultValues = [];
	$nav.children().last().children().each(function(index){
		defaultValues.push($(this).css(["background-color", "color"]));
	})

	// $nav.children().children().hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});
	
	// provides the clicked / unclicked look to the nav buttons
	$nav.children().last().children().on("click", function(e){
		var self = this;
		var $self = $(this);

		$(this).parent().children().each(function(index){
			if ( this === self ) {
				changeAttribute($(this), "background-color", navBackColorNew);
				scrollToAnim($self.text());
			} else {
				changeAttribute($(this), "background-color", navBackColor);
			}
		});
	});

	// $nav.children().first().find("li.image").on("click", function(e){
	// 	switcheroo($(this), "background-color", headBackColor, navBackColorNew);
	// });
	
	$meIcon = $nav.children().first().find("li.image");

	$meIcon.hover(
		function(){
			switcheroo($(this), "background-color", headBackColor, navBackColorNew);
		}, 
		function(){
			switcheroo($(this), "background-color", headBackColor, navBackColorNew);
		}
	);

	$meIcon.on("click", function(e){
		scrollToAnim($intro.attr("id"));
	})



	// $nav.children().children().one("click", function(){

	// 	$(this).parent().animate({
	// 		top: "40px"
	// 	}, 300);

	// 	// ##### TO DO ######
	// 	// Need to find a way to lift up the Nav with the Ul
	// 	// Like I'm attempting below 
	// 	// $(this).parent().parent().css({top: "20px"});
	// 	$nameContainer.css({display: "none"});

	// });
	
	// provides the different views based on which button is clicked
	

})