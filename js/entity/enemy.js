/**
 * 
 */

define(function() {

	Enemy = function(game, layer, group, map, index, spriteName, x, y, speed) {
		this.game = game;
		this.layer = layer;
		this.group = group;
		
		this.map = map;
		this.lastDir = "none";
        
		this.explosions = this.game.add.group();
		for (var i = 0; i < 10; i++) {
			var explosionAnimation = this.explosions.create(0, 0, 'explosion',
					[ 0 ], false);
			explosionAnimation.anchor.setTo(0.5, 0.5);
			explosionAnimation.animations.add('explosion');
		}

		this.sprite = this.game.add
				.sprite(x * 32 + 16, y * 32 + 16, spriteName);
		this.sprite.name = spriteName + "_" + index;
		this.name = this.sprite.name;

		this.game.physics.enable(this.sprite);

		this.sprite.body.collideWorldBounds = true;
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.body.velocity.x = speed;
		this.sprite.body.velocity.y = 0;

		
		this.alive = true;        
		this.health = 20;
		this.speed = speed;
		
		this.group.add(this.sprite);
	};

	Enemy.prototype = {
		init : function() {

		},

		update : function() {
			if (this.pauseGame) {
				return;
			}
			
			this.game.physics.arcade.collide(this.sprite, this.layer,
					this.collisionHandler, null, this);
		},

		collisionHandler : function(obj1, obj2) {
			var dir = this.findDirection();

			if (dir == "bottom") {
				obj1.body.velocity.x = 0;
				obj1.body.velocity.y = this.speed;
				obj1.angle = 90;
			}

			if (dir == "right" || dir == "left") {
				obj1.body.velocity.x = this.speed;
				obj1.body.velocity.y = 0;
				obj1.angle = 0;
			}

			if (dir == "top") {
				obj1.body.velocity.x = 0;
				obj1.body.velocity.y = -this.speed;
				obj1.angle = -90;
			}
			this.lastDir = dir;
		},

		findDirection : function() {
			var tileX = Math.round(this.sprite.x / 32);
			var tileY = Math.round(this.sprite.y / 32);

			var right = this.map.getTile(tileX + 1, tileY, this.layer, true).index;
			var left = this.map.getTile(tileX - 1, tileY, this.layer, true).index;
			var bottom = this.map.getTile(tileX, tileY + 1, this.layer, true).index;
			var top = this.map.getTile(tileX, tileY - 1, this.layer, true).index;

			if (right == 16 && this.lastDir != "right") {
				return "right";
			}
			if (left == 16 && this.lastDir != "left") {
				return "left";
			}
			if (bottom == 16 && this.lastDir != "bottom") {
				return "bottom";
			}
			if (top == 16 && this.lastDir != "top") {
				return "top";
			}
		},

		damage : function(val) {
			this.health -= val;
			
			if (this.health <= 0) {

				this.alive = false;
				this.sprite.kill();

				var explosionAnimation = this.explosions.getFirstExists(false);
				explosionAnimation.reset(this.sprite.x, this.sprite.y);
				explosionAnimation.play('explosion', 30, false, true);

				return true;
			}
			return false;
		}
	};

	return Enemy;
});