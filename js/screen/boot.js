/**
 * 
 */
define(['helper/resource'], function(R) {
	Boot = function(game) {
		this.game = game;
	};

	Boot.prototype = {
		preload : function() {
			R.game = this.game;
			 R.loadImage(["splash.png"]);
		},

		create : function() {		
			this.game.state.start('Preloader');
		}
	};

	return Boot;
});