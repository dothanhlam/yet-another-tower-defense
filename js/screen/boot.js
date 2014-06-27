/**
 * 
 */
define([], function() {
	Boot = function(game) {
		this.game = game;
	};

	Boot.prototype = {
		preload : function() {
		},

		create : function() {
		
			this.game.state.start('Preloader');
		}
	};

	return Boot;
});