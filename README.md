## Viewport events [![Code Climate](https://codeclimate.com/github/kudago/viewport-events/badges/gpa.svg)](https://codeclimate.com/github/kudago/viewport-events) <a href="UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>


Enable viewport events for HTML elements: `enteredView`, `leftView`.


`$ npm install viewport-events`


```js
	var vpEvents = require('viewport-events');

	//enable viewport events for all elements on the page
	vpEvents.enable();
	$('.my-element').on('attached', function(){});
	$('.my-other-element').on('enteredView', function(){});

	//Disable all viewport events
	vpEvents.disable();


	//Enable viewport events for a Node/NodeList
	vpEvents.enable(element);
	element.addEventListener('enteredView', function(){});
	element.addEventListener('attached', function(){});

	//Disable viewport events for the previously added element/selector
	vpEvents.disable(element);
```


[![NPM](https://nodei.co/npm/viewport-events.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/viewport-events/)