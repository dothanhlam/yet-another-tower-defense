/**
 * 
 */
define(["entity/enemy"], function(Enemy) {

	function Play(game) {
		this.game = game;
		this.map = null;
		this.layer = null;
		this.tileset = null;
		
		this.enemy = null;
		this.lastDir = "";
	}

	Play.prototype = {
		preload : function() {
		},

		create : function() {
			
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.map = this.game.add.tilemap('default');
			this.tileset = this.map.addTilesetImage('default', 'tiles', 32, 32, 0, 0, 1);
			
			this.layer = this.map.createLayer("World");
		    this.layer.resizeWorld();
		    this.map.setCollision([17]);
		    this.layer.debug = true;
		    this.addEnemy();
		},
		
		update : function() {			
			if (this.enemy) {
				this.game.physics.arcade.collide(this.enemy.sprite, this.layer,  this.collisionHandler, null, this);
			}
		},
		
		collisionHandler: function  (obj1, obj2) {
			var dir = this.findDirection();
			console.log("dir: " + dir);
			console.log("last: " + this.lastDir);
			if (dir == "bottom") {
				obj1.body.velocity.x = 0;
				obj1.body.velocity.y = 64;
				obj1.angle = 90;
			}
			
			if (dir == "right" || dir == "left") {
				obj1.body.velocity.x = 64;
				obj1.body.velocity.y = 0;
				obj1.angle = 0;
			}
			
			if (dir == "top") {
				obj1.body.velocity.x = 0;
				obj1.body.velocity.y = -64;
				obj1.angle = -90;
			}
			this.lastDir = dir;
			
		},
		
		findDirection : function() {
			var tileX = Math.round(this.enemy.sprite.x / 32);
			var tileY = Math.round(this.enemy.sprite.y / 32);
		
		/*	var left = this.map.getTileLeft(0, tileX, tileY).index;
			var bottom = this.map.getTileBelow(0, tileX, tileY).index;
			var top = this.map.getTileAbove(0, tileX, tileY).index;
			var right = this.map.getTileRight(0, tileX, tileY).index; */
			
			var right = this.map.getTile(tileX + 1, tileY, this.layer, true).index;
			var left = this.map.getTile(tileX - 1, tileY, this.layer, true).index;
			var bottom = this.map.getTile(tileX, tileY + 1, this.layer, true).index;
			var top = this.map.getTile(tileX, tileY - 1, this.layer, true).index; 
			
			console.log("-----------------")
			console.log("right: " + right)
			console.log("left: " + left)
			console.log("bottom: " + bottom)
			console.log("top: " + top)
			
			if (right == 16 && this.lastDir != "right") return "right";
			if (left == 16 && this.lastDir != "left") return "left";
			if (bottom == 16 && this.lastDir != "bottom") return "bottom";
			if (top == 16 && this.lastDir != "top") return "top";
		},
		
		addEnemy: function() {
			this.enemy = new Enemy(this.game, 'car', 0, 2);
		    this.enemy.init();
		}
	};

	return Play;
});