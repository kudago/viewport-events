## Viewport events [![Code Climate](https://codeclimate.com/github/kudago/viewport-events/badges/gpa.svg)](https://codeclimate.com/github/kudago/viewport-events) <a href="UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>


Enable viewport events for HTML elements: `enteredView`, `leftView`.


## Usage

`$ npm install viewport-events`


```js
	var vpEvents = require('viewport-events');

	//enable viewport events for all elements on the page
	vpEvents.enable();
	$('.my-element').on('leftView', function(){});
	$('.my-other-element').on('enteredView', function(){});

	//Disable all viewport events
	vpEvents.disable();


	//Enable viewport events for a Node/NodeList
	vpEvents.enable(element);
	element.addEventListener('enteredView', function(){});
	element.addEventListener('leftView', function(){});

	//Disable viewport events for the previously added element/selector
	vpEvents.disable(element);
```

## API

### vp.enable(selector)

Enable viewport events for an Element, NodeList or selector. If no selector specified, `'*'` is used.

### vp.disable(selector)

Disable viewport events for previously registered selector. If no selector specified, all viewport events are unbound.

### vp.enteredViewCallbackName

Callback name used for entering viewport event. `enteredView` is used by default.

### vp.leftViewCallbackName

Callback name used for leaving viewport event. `leftView` is used by default.


[![NPM](https://nodei.co/npm/viewport-events.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/viewport-events/)