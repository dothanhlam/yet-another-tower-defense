/**
 * 
 */
define(['phaser', 'helper/resource'], function(Phaser, R) {
	

	function Preloader(game) {
		this.game = game;
		
	}

	Preloader.prototype = {
		preload : function() {
			R.game = this.game;
			R.loadTiledMap(["default"]);
		    R.loadImage(["car.png","bullet.png","tiles.png"]);
		    R.loadAtlas(["tanks"]);
		    R.loadSingleSpriteSheet("explosion", 64, 64, 23);
		},

		create : function() {
			this.game.state.start('Play');
		}
	};

	return Preloader;
});