/**
 * 
 */
define(["entity/enemy", "entity/tower"], function(Enemy, Tower) {

	function Play(game) {
		this.game = game;
		this.map = null;
		this.layer = null;
		
		this.towers  = [];
		this.enemies = [];		
	}

	Play.prototype = {
		preload : function() {
		},

		create : function() {
			
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.map = this.game.add.tilemap('default');
			this.map.addTilesetImage('default', 'tiles', 32, 32, 0, 0, 1);
			
			this.layer = this.map.createLayer("World");
		    this.layer.resizeWorld();
		    this.map.setCollision([17]);
		    
		    this.addTower();
		    this.addEnemy();
		    
		    var self = this;
		    setInterval( function() {
		    	self.addEnemy();
		    }, 2000);  
		    
		},
		
		update : function() {	
			var i;
			if (this.enemies) {
				for (i = 0; i < this.enemies.length; i ++) {
					 this.enemies[i].update();
				}
			}
			
			if (this.towers) {
				for (i = 0; i < this.towers.length; i ++) {
					 this.towers[i].update(this.enemies);
				}
			}
		},
		
		addEnemy: function() {
			var index = this.enemies.length;
			this.enemies.push(new Enemy(this.game, this.layer, this.map, index, 'car', 0, 2, 128));
		},
		
		 addTower: function() {
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet",2, 1, 1));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 2, 3));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 3, 1));

			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 4, 1));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 8, 1));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 7, 8, 1)); 
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 15, 8, 1)); 
		 }
	};

	return Play;
});