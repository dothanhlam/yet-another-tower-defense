/**
 * 
 */

define([], function() {
	function Tower(game, canonSprite, baseSprite, bulletSprite, x, y, range) {
		this.game = game;
		this.tank = this.game.add.sprite(x * 32 + 16, y * 32 + 16, 'tank',
				'tank1');
		this.tank.anchor.setTo(0.5, 0.5);
		this.game.physics.enable(this.tank, Phaser.Physics.ARCADE);

		this.tank.body.setSize(96 * range, 96 * range, 0, 0);
		this.tank.body.reset(x * 32 + 16, y * 32 + 16);
		this.tank.body.immovable = true;
		this.tank.body.customSeparateX = true;
		this.tank.body.customSeparateY = true;

		this.tank.animations.add('move', [ 'tank1', 'tank2', 'tank3', 'tank4',
				'tank5', 'tank6' ], 20, true);

		this.turret = this.game.add.sprite(x * 32 + 16, y * 32 + 16, 'tank',
				'turret');
		this.turret.anchor.setTo(0.3, 0.5);
		this.turret.rotation = 0;

		this.turret.scale.x = this.turret.scale.y = 0.5;
		this.tank.scale.x = this.tank.scale.y = 0.5;

		this.range = range;

		this.fireRate = 100;
		this.nextFire = 0;
		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'bullet', 0, false);
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 0.5);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

		this.game.debug.body(this.tank);
	}

	Tower.prototype = {
		init : function() {
		},

		fire : function(turret, target) {

			if (this.game.time.now > this.nextFire
					&& this.bullets.countDead() > 0) {
				this.nextFire = this.game.time.now + this.fireRate;

				var bullet = this.bullets.getFirstExists(false);
				bullet.reset(turret.x, turret.y);
				bullet.rotation = this.game.physics.arcade.moveToObject(bullet,
						target, 500);

			}
		},

		update : function(enemies) {
			for (var i = 0; i < enemies.length; i++) {
				this.game.physics.arcade.collide(this.tank, enemies[i].sprite,
						this.collisionHandler, this.processCallback, this);
			}
		},

		collisionHandler : function(base, target) {
		},

		processCallback : function(base, target) {
			this.turret.rotation = this.game.physics.arcade.angleBetween(
					this.turret, target);
			this.fire(this.turret, target);
		}
	};

	return Tower;
});