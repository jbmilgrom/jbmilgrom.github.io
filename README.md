jbmilgrom.github.io
===================
<s>**-- See it hosted [here](http://jonathanmilgrom.com).**</s>

This site was built from scratch using sass and jQuery. 

Here are some of the javascript/jQuery highlights:

```javascript
var switcheroo = function($object, attribute, valueOne, valueTwo){
	var currentValue = $object.css(attribute);
	if (currentValue === valueOne) {
		changeAttribute($object, attribute, valueTwo);
	} else {
		changeAttribute($object, attribute, valueOne);
	}
}
```

This function abstracts out any "switcheroo" functionality that you might like on a css attribute.  It works in conjunction with changeAttribute: 

```javascript
var changeAttribute = function($object, attribute, newValue){
	var obj = {};
	obj[attribute] = newValue; 
	$object.css(obj);
}
```

In this app, switcheroo functions were applied in the following way: 

```javascript
$meIcon.hover(
	function(){
		switcheroo($(this), "background-color", headBackColor, navBackColorNew);
	}, 
	function(){
		switcheroo($(this), "background-color", headBackColor, navBackColorNew);
	}
);
```
	
But the nice part is they are generally applicable for any css attribute.  The application of the functions could have easily looked like:

```javascript
$meIcon.hover(
	function(){
		switcheroo($(this), "color", red, black);
	}, 
	function(){
		switcheroo($(this), "color", red, black);
	}
);
```
	
Notice that the order of the colors doesn't matter.  Switcheroo checks the current value and acts accordingly.  The fact that switcheroo is called twice is only a function of the jQuery hover function. 
	
Another way of providing similar functionality is with inOrOut.  Here, I hard-coded some of the css since it is a common pattern: 

```javascript
var inOrOut = function($object){
	var $currentValues = $object.css(["background-color", "color"]);
	$object.css({"background-color": $currentValues["color"], "color": 	$currentValues["background-color"] });
}
```

and applied it on a hover function as well:

```javascript
$contactButtons.hover(function(){inOrOut($(this))}, function(){inOrOut($(this))});
```
