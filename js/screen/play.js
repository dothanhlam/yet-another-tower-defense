/**
 * 
 */
define([], function() {

	function Play(game) {
		this.game = game;
		this.map = null;
		this.layer = null;
		this.tileset = null;
	}

	Play.prototype = {
		preload : function() {
		},

		create : function() {
			console.log('Play.create');
			this.map = this.game.add.tilemap('default');
			this.tileset = this.map.addTilesetImage('default', 'tiles', 32, 32, 0, 0, 1);
			this.layer = this.map.createLayer("World");
		    this.layer.resizeWorld();
		}
	};

	return Play;
});