define({
	game : null,

	loadImage : function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i].replace(/\.[^/.]+$/, "");
			this.game.load.image(name, "assets/image/" + arr[i]);
		}
	},

	loadAtlas : function(arr) { // must be .png
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i];
			this.game.load.atlas(name, "assets/image/" + arr[i]
					+ ".png", "assets/atlas/" + arr[i] + ".json");
		}
	},

	loadAudio : function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i].replace(/\.[^/.]+$/, "");
			this.game.load.audio(name, "assets/audio/" + arr[i]);
		}
	},
	
	loadTiledMap: function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i];
		    this.game.load.tilemap(name, 'assets/tiled/'+name+'.json', null, Phaser.Tilemap.TILED_JSON);
		}
	},
	
	loadSingleSpriteSheet: function(name, w, h, frames ) {
	    this.game.load.spritesheet(name, 'assets/image/'+name+'.png', w, h, frames);
	}
});