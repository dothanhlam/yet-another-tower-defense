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
			 R.loadAudio(["xeon6.ogg"]);
		},

		create : function() {
			music = this.game.add.audio('xeon6',1,true);
			music.play('',0,1,true);
			this.game.state.start('Preloader');
		}
	};

	return Boot;
});