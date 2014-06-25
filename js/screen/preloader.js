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
		    this.game.load.image('car', 'assets/image/car90.png');     
		    this.game.load.atlas('tank', 'assets/image/tanks.png', 'assets/atlas/tanks.json');
		    this.game.load.image('bullet', 'assets/image/bullet.png');     
		    this.game.load.spritesheet('kaboom', 'assets/image/explosion.png', 64, 64, 23);
		},

		create : function() {
			this.game.state.start('Play');
		}
	};

	return Preloader;
});