// var clicked = function($object){
// 	var $currentValues = $object.css(["background-color", "color"]);
// 	$object.css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
// }

// var unclicked = function($object, index){
// 	$object.css({"background-color": defaultValues[index]["background-color"], "color": defaultValues[index]["color"] });
// }

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
	}, 800);
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
	var picBorder = $('#Projects').find('img').css("border");
	var picBorderNew = "4px solid " + navBackColorNew;

	
	
	// clicked / unclicked for the nav buttons
	$navButtons.on("click", function(e){
		var self = this;
		var $self = $(this);

		$(this).parent().children().each(function(index){
			if ( this === self ) {
				changeAttribute($(this), "background-color", navBackColorNew);
				scrollToAnim($self.text());
				
				// change stored data value of meIcon so that meIcon 
				// knows that we've scrolled to Contact already
				if ($self.text() === "Contact") {
					$meIcon.attr({data: "down"});
				}
			} else {
				changeAttribute($(this), "background-color", navBackColor);
			}
		});
	});
	

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
		var data = $(this).attr("data")
		
		// switch data value so meIcon is aware of its position
		if (data === "down") {
			scrollToAnim($intro.attr("id"));
			$(this).attr({data: "up"});

			// turn "off" nav buttons
			$navButtons.each(function(index){
				changeAttribute($(this), "background-color", navBackColor);
			})
		} else {
			scrollToAnim("Contact");
			$(this).attr({data: "down"});

			// turn "off" nav buttons
			$navButtons.each(function(index){
				changeAttribute($(this), "background-color", navBackColor);
			})
			// turn "on" contact button 
			changeAttribute($navButtons.last(), "background-color", navBackColorNew);
		}
	})

	// hover functionality for contact buttons
	$contactButtons.hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});

	// hover functionality for project pics	
	$('#Projects').find('img').hover(
		function(){
			switcheroo($(this), "border", picBorder, picBorderNew);
		}, 
		function(){
			switcheroo($(this), "border", picBorder, picBorderNew);
		}
	);
		

})