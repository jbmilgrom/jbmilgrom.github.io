var clicked = function($object){
	var $currentValues = $object.css(["background-color", "color"]);
	$object.css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
}

var unclicked = function($object, index){
	$object.css({"background-color": defaultValues[index]["background-color"], "color": defaultValues[index]["color"] });
}

var inOrOut = function($object){
	var $currentValues = $object.css(["background-color", "color"]);
	$object.css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
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

var domPosition = function(idText){
	return $("#" + idText).offset().top - $intro.offset().top;
}

var scrollToAnim = function(idText){
	$('html, body').animate({
		scrollTop: domPosition(idText)
	}, 700);
}


// var scrollRange = function($scrollObject, $object){
// 	return ( $scrollObject === $object.scrollTop() || $scrollObject === ($object.scrollTop() + $object.innerHeight()) )
// }

$(function(){

	// jQuery elements
	$nav = $("nav");
	$navButtons = $nav.children().last().children();
	$meIcon = $nav.children().first().find("li.image");
	$intro = $("#introduction");
	$contact = $("#Contact");
	$contactButtons = $contact.children().first().children();
	$seeCodeButton = $contact.children().last().children();
	sections = [$("#Projects"), $("#Contact"), $("#Blog")];

	// colors
	var navBackColor = $nav.children().last().children().first().css("background-color");
	var navFontColor = $nav.children().last().children().first().css("color");
	var navBackColorNew = "#45C2C6";
	var navFontColorNew = navBackColor;
	var headBackColor = $nav.children().first().find("li.image").css("background-color");

	// defaultValues = [];
	// $nav.children().last().children().each(function(index){
	// 	defaultValues.push($(this).css(["background-color", "color"]));
	// })

	// $nav.children().children().hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});
	
	// clicked / unclicked for the nav buttons
	$navButtons.on("click", function(e){
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
	

	// hover fuctionality for "Me" Icon
	$meIcon.hover(
		function(){
			switcheroo($(this), "background-color", headBackColor, navBackColorNew);
		}, 
		function(){
			switcheroo($(this), "background-color", headBackColor, navBackColorNew);
		}
	);

	// automatic scroll for "Me" Icon
	$meIcon.on("click", function(e){
		scrollToAnim($intro.attr("id"));
		$navButtons.each(function(index){
			changeAttribute($(this), "background-color", navBackColor);
		})
	})

	// hover functionality for contact buttons
	$contactButtons.hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});
	// $seeCodeButton.hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});
	
	// $(window).scroll(function(){
	// 	$navButtons.each(function(index){
	// 		changeAttribute($(this), "background-color", navBackColor);
	// 	}) 
	// })	

	// $(window).scroll(function(){
	// 	$self = $(this);

	// 	if ($(this).scrollTop() > domPosition($("#Projects").attr("id"))) {
	// 		changeAttribute($navButtons.first(), "background-color", navBackColorNew);	
	// 	} 
	 
	// })	

})