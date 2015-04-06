var on = require('emmy/on');
var emit = require('emmy/emit');
var q = require('tiny-element');
var intersects = require('intersects');


var doc = document, win = window;


/**
 * @module viewport-events
 *
 * @todo  Work out tolerance issue (whether it needs to be passed as an option - sometimes useful, like to detect an element being fully visible)
 */
var vpEvents = module.exports = enable;
vpEvents.enable = enable;
vpEvents.disable = disable;


/** Defaults can be changed outside */
vpEvents.enteredViewCallbackName = 'enteredView';
vpEvents.leftViewCallbackName = 'leftView';


/** List of observable viewport events targets/queries */
var vpTargets = [];


/** Set of entered viewport items */
var enteredItemsSet = new WeakSet;


/**
 * Observe targets
 */
function enable(target){
	if (!target) target = '*';

	//ignore existing target
	if (vpTargets.indexOf(target) >= 0) return;

	//add target
	vpTargets.push(target);

	checkViewport();
}


/**
 * Remove targets from observation list
 */
function disable(target){
	//if no target passed - remove all targets
	if (!target) {
		vpTargets = [];
		return;
	}

	var idx = vpTargets.indexOf(target);
	if (idx >= 0) {
		vpTargets.splice(idx,1);
	}
}


/** Viewport size */
var vpRect = {
	top:0,
	left:0,
	bottom: win.innerHeight,
	right: win.innerWidth,
	width: win.innerWidth,
	height: win.innerHeight
};


/** Keep viewport updated */
on(win, 'resize', function(){
	vpRect.bottom = win.innerHeight;
	vpRect.right = win.innerWidth;
	vpRect.width = win.innerWidth;
	vpRect.height = win.innerHeight;
});



/** Add scroll handler for the doc */
on(doc, 'scroll DOMContentLoaded', checkViewport);



/** Check elements need to be entered/left */
function checkViewport () {
	for (var i = vpTargets.length; i--;) {
		var query = vpTargets[i];

		var targets = q(query, true);

		for (var j = targets.length; j--;) {
			var target = targets[j];
			var targetRect = target.getBoundingClientRect();

			//if item is entered - check to call entrance
			if (enteredItemsSet.has(target)) {
				if (!intersects(targetRect, vpRect, {tolerance: 0})) {
					enteredItemsSet.delete(target);
					emit(target, vpEvents.leftViewCallbackName, null, true);
				}
			}

			//check to call leave
			else {
				if (intersects(targetRect, vpRect, {tolerance: 0})) {
					enteredItemsSet.add(target);
					emit(target, vpEvents.enteredViewCallbackName, null, true);
				}
			}
		}
	}
}