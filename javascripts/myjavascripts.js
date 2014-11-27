
var inOrOut = function($object){
	    var $currentValues = $object.css(["background-color", "color"]);
	    $object.css({"background-color": $currentValues["color"], "color": $currentValues["background-color"] });
    },

    changeAttribute = function($object, attribute, newValue){
	    var obj = {};
	    obj[attribute] = newValue; 
	    $object.css(obj);
    },

    switcheroo = function($object, attribute, valueOne, valueTwo){
	    var currentValue = $object.css(attribute);

	    if (currentValue === valueOne) {
		    changeAttribute($object, attribute, valueTwo);
	    } else {
		    changeAttribute($object, attribute, valueOne);
	    }
    },

    domPosition = function(idText){
	    return $("#" + idText).offset().top - $intro.offset().top;
    },

    scrollToAnim = function(idText){
	    $('html, body').animate({
		    scrollTop: domPosition(idText)
	    }, 800);
    };


$(function(){

	// jQuery elements
	$nav = $("nav");
	$navButtons = $nav.children().last().children();
	$meIcon = $nav.children().first().find("li.image");
	$intro = $("#introduction");
	$contact = $("#Contact");
	$contactButtons = $contact.children().first().children();
	$seeCodeButton = $contact.children().last().children();
	$projects = $('#Projects');
	$projectImages = $projects.find('img');
	sections = [$("#Projects"), $("#Contact"), $("#Blog")];

	// colors
	var navBackColor = $nav.children().last().children().first().css("background-color");
	var navFontColor = $nav.children().last().children().first().css("color");
	var navBackColorNew = "#45C2C6";
	var navFontColorNew = navBackColor;
	var headBackColor = $nav.children().first().find("li.image").css("background-color");
	var picBorder = $('#Projects').find('img').css("border");
	var picBorderNew = "4px solid " + navBackColorNew;
	var bestGrayBlue = "#424151";

	
	
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
		var data = $(this).attr("data");
		
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
	});

	// hover functionality for contact buttons
	$contactButtons.hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});

	// can be used to switch on gif
	$picAndGif = $projects.find('#leaf').find('.image');

	// hover functionality for project pics	
	$projectImages.hover(
		function(){
			switcheroo($(this), "border", picBorder, picBorderNew);
		}, 
		function(){
			switcheroo($(this), "border", picBorder, picBorderNew);
		}
	);	
		
	// supplementing css @media query (max-width: 650px)
	// doing this to avail myself of jQuery children(), so can access each project in identical way 
	$(window).resize(function(){
		
		// if window width is resixed to less than 650px
		if ( $(this).width() < 700 ) {

			$projectImages.each(function(index){
				// taking sibling image and making it background image of each "ul"
				var $element = $(this).parent().parent().parent().find("ul");

				changeAttribute($element, "background", "url(" + $(this).attr("src") + ")");
				changeAttribute($element, "background-size", $element.css("width") + " " + $element.css("height"));	
			})
		}
		
		// if window is resized to greater than 650px  
		if ( $(this).width() > 700 ) {

			$projectImages.each(function(index){
				// removing image
				var $element = $(this).parent().parent().parent().find("ul");
				changeAttribute($element, "background", "none");
			})
		}
	});

	// if window width is less than 650px
	if ( $(window).width() < 700 ) {

		$projectImages.each(function(index){
			// taking sibling image and making it background image of each "ul"
			var $element = $(this).parent().parent().parent().find("ul");

			changeAttribute($element, "background", "url(" + $(this).attr("src") + ")");
			changeAttribute($element, "background-size", $element.css("width") + " " + $element.css("height"));	
		})
	}

})
