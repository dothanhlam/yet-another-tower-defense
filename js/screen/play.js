/**
 * 
 */
define(["entity/enemy", "entity/tower", "entity/player"], function(Enemy, Tower, Player) {

	function Play(game) {
		this.game = game;
		this.map = null;
		this.layer = null;
		
		this.player = null;
		this.towers  = [];
		this.enemies = [];		
		
		this.gamePause = false;
		this.enableInventoryMode = false;
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
		    
		    
		    this.enemiesGroup = this.game.add.group();
		    this.towersGroup = this.game.add.group();
		    
		//    this.addTower();
		    this.addEnemy();
		    this.addPlayer();
		    
		    this.marker = this.game.add.graphics();
		    this.marker.lineStyle(2, 0x000000, 1);
		    this.marker.drawRect(0, 0, 32, 32);
		    
		    this.game.input.onDown.add(this.addItem, this);

		    this.start();
		    
		},
		
		update : function() {	
			this.marker.x = this.layer.getTileX(this.game.input.activePointer.worldX) * 32;
			this.marker.y = this.layer.getTileY(this.game.input.activePointer.worldY) * 32;
		
			
			if (this.gamePause == true) return;
			
			var i;
			for (i = 0; i < this.enemies.length; i ++) {
				if (this.enemies[i].alive) {
					this.enemies[i].update();
				}
			}
		
			for (i = 0; i < this.towers.length; i ++) {
				 this.towers[i].update(this.enemies);
			}
		},
		
		addItem: function() {
			if (!this.enableInventoryMode) {
				return;
			}
			var tileX = this.layer.getTileX(this.game.input.activePointer.worldX);
			var tileY = this.layer.getTileY(this.game.input.activePointer.worldY);
		
			 this.towers.push(new Tower(this.game, this.towersGroup, tileX, tileY, 1));

		},
		
		addEnemy: function() {
			var index = this.enemies.length;
			this.enemies.push(new Enemy(this.game, this.layer, this.enemiesGroup ,this.map, index, 'car', 0, 2, 64));
		},
		
		 addTower: function() {
			 this.towers.push(new Tower(this.game, this.towersGroup, 2, 1, 1));
			 this.towers.push(new Tower(this.game, this.towersGroup, 5, 2, 3));
			 this.towers.push(new Tower(this.game, this.towersGroup, 5, 3, 2));
			 this.towers.push(new Tower(this.game, this.towersGroup, 5, 4, 1));
			 this.towers.push(new Tower(this.game, this.towersGroup, 5, 8, 1));
			 this.towers.push(new Tower(this.game, this.towersGroup, 7, 8, 1)); 
			 this.towers.push(new Tower(this.game, this.towersGroup, 15, 8, 1)); 
		 },
		 
		 addPlayer: function() {
			 this.player = new Player(this.game, this.layer, this);
		 },
		 
		 start: function() {
			 var self = this;
			 self.interval = setInterval( function() {
		    		self.addEnemy();		    	
		    }, 2000);   
		 },
		 
		 pause: function () {
			 clearInterval(this.interval);
			 delete this.interval;
			 this.gamePause = true;
			 this.towersGroup.exists = !this.gamePause ;
			 this.enemiesGroup.exists = ! this.gamePause ;
		},

		resume: function () {
			if (!this.interval) this.start();
			 this.gamePause = false;
			 this.towersGroup.exists = !this.gamePause ;
			 this.enemiesGroup.exists = ! this.gamePause ;
		},
			  				 
		 garbage: function() {
			 for(var i = this.enemies.length; i--;) {
		          if(this.enemies[i].alive == false) {
		        	  this.enemies[i].splice(i, 1);		        	  
		          }
		      }
		 }
	};

	return Play;
});