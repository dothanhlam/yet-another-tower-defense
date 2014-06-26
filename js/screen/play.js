/**
 * 
 */
define(["entity/enemy", "entity/tower"], function(Enemy, Tower) {

	function Play(game) {
		this.game = game;
		this.map = null;
		this.worldLayer = null;
		
		
		this.towers  = [];
		this.enemies = [];
		
		this.enemiesCount = 0;
	}

	Play.prototype = {
		preload : function() {
		},

		create : function() {
			
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.map = this.game.add.tilemap('default');
			this.map.addTilesetImage('default', 'tiles', 32, 32, 0, 0, 1);
			
			this.worldLayer = this.map.createLayer("World");
		    this.worldLayer.resizeWorld();
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
			this.enemies.push(new Enemy(this.game, this.worldLayer, this.map,  this.enemiesCount++, 'car', 0, 2, 128));
			this.garbage();

		},
		
		 addTower: function() {			 
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet",2, 1, 1));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 2, 3));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 3, 2));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 4, 1));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 5, 8, 1));
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 7, 8, 1)); 
			 this.towers.push(new Tower(this.game,"canon", "base", "bullet", 15, 8, 1)); 
		 },
		 
		 garbage: function() {
			 
		 }
	};

	return Play;
});