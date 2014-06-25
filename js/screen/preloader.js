/**
 * 
 */
define(['phaser'], function(Phaser) {
	

	function Preloader(game) {
		this.game = game;
		
	}

	Preloader.prototype = {
		preload : function() {
		    this.game.load.tilemap('default', 'assets/tiled/default.json', null, Phaser.Tilemap.TILED_JSON);
		    this.game.load.image('tiles', 'assets/image/RPGTiles.png');
            
		},

		create : function() {
			this.game.state.start('Menu');

		}
	};

	return Preloader;
});