'use babel';
'use strict';

const Dom = {

	// - - - -
	// QUERIES
	// - - - -

	query: function (el) { return document.querySelector(el) },
	queryAll: function (el) { return document.querySelectorAll(el) },


	// - - - -
	// ACTIONS
	// - - - -

	addClass: function(el, className) {
		this.toggleClass('add', el, className)
	},

	removeClass: function(el, className) {
		this.toggleClass('remove', el, className)
	},

	toggleClass: function(action, el, className) {
		if ( el !== null ) {
			for (var i = 0; i < el.length; i++) {
				el[i].classList[action](className);
			}
		}
	}

}

export {Dom};
