/**
 * 
 */
define([], function() {

	function Preloader(game) {
		this.game = game;
	}

	Preloader.prototype = {
		preload : function() {
		},

		create : function() {
			console.log('Preloader.create');
		}
	};

	return Preloader;
});