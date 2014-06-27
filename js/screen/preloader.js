/**
 * 
 */
define(['phaser', 'helper/resource'], function(Phaser, R) {
	

	Preloader = function (game) {
		this.game = game;		
	};

	Preloader.prototype = {
		preload : function() {
			this.game.add.image(0, 0, "splash");
			
			this.graphics = this.game.add.graphics(0, 0);
			this.graphics.lineStyle(2, 0xFFFF00, 1);
		    this.graphics.drawRect((this.game.width - 200) / 2, (this.game.height + 100) / 2, 200, 10);
		    this.graphics.lineStyle(1, 0xFFCC00, 1);
		    
			R.game = this.game;
			R.loadTiledMap(["default"]);
		    R.loadImage(["car.png","bullet.png","tiles.png","menu.png"]);
		    R.loadAtlas(["tanks"]);
		    R.loadSingleSpriteSheet("explosion", 64, 64, 23);
		    
		    R.loadSingleSpriteSheet("play", 47, 48, 1);
		    R.loadSingleSpriteSheet("options", 47, 48, 1);
		    R.loadSingleSpriteSheet("quit", 47, 48, 1);		    
		    
		    this.game.load.onFileComplete.add(this.loadHandler, this);
		},

		create : function() {			
			this.game.state.start('Play');
		},
		
		loadHandler: function(progress){ 
            this.graphics.beginFill(0xFFCC00, 1);
            this.graphics.drawRect((this.game.width - 196) / 2, (this.game.height + 100) / 2 + 2, 195 * progress / 100, 5);
            this.graphics.endFill();
        },

	};

	return Preloader;
});