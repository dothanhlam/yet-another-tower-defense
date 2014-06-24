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
			this.game.load.atlasJSONHash(name, "assets/atlas/" + arr[i]
					+ ".png", "assets/atlas/" + arr[i] + ".json");
		}
	},

	loadAudio : function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i].replace(/\.[^/.]+$/, "");
			this.game.load.audio(name, "assets/audio/" + arr[i]);
		}
	},
	
	loadTiledMap: function() {
		
	}
});