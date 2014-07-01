/**
 * 
 */

define(function() {
	Tower = function(game, group, x, y, type, range, cost) {
		this.group = group;
		this.game = game;
		this.range = range;
		this.cost = cost;

		this.tank = this.game.add.sprite(x * 32 + 16, y * 32 + 16, 'tanks', type);
		this.tank.anchor.setTo(0.5, 0.5);
		this.game.physics.enable(this.tank, Phaser.Physics.ARCADE);

		this.tank.body.setSize(96 * range, 96 * range, 0, 0);
		this.tank.body.reset(x * 32 + 16, y * 32 + 16);

		this.turret = this.game.add.sprite(x * 32 + 16, y * 32 + 16, 'tanks',
				'turret');
		this.turret.anchor.setTo(0.3, 0.5);
		this.turret.rotation = 0;

		this.turret.scale.x = this.turret.scale.y = 0.5;
		this.tank.scale.x = this.tank.scale.y = 0.5;

		this.trackingEnemies = null;

		this.fireRate = 100;
		this.nextFire = 0;
		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(1, 'bullet', 0, false);
		this.bullets.setAll('anchor.x', 0.3);
		this.bullets.setAll('anchor.y', 0.5);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

	    this.music = this.game.add.audio('shot1');
	    this.music.volume = 0.25;
	    
		this.group.add(this.tank);
		this.group.add(this.turret);
		this.group.add(this.bullets);

		this.tank.bringToTop();
		this.turret.bringToTop();
	};

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
			    this.music.play();

			}
		},

		lockTarget : function(target) {
			if (this.trackingEnemies == null) {
				return null;
			}
			for (var i = 0; i < this.trackingEnemies.length; i++) {
				if (this.trackingEnemies[i].name === target.name) {
					return this.trackingEnemies[i];
				}
			}
			return null;
		},

		update : function(enemies) {

			this.trackingEnemies = enemies;

			for (var i = 0; i < enemies.length; i++) {
				if (enemies[i].alive) {
					this.game.physics.arcade.overlap(this.tank,
							enemies[i].sprite, this.overlappingHandler, null,
							this);
					this.game.physics.arcade.overlap(this.bullets,
							enemies[i].sprite, this.bulletsHitEmeniesHandler,
							null, this);
				}
			}
		},

		overlappingHandler : function(base, target) {
			this.turret.rotation = this.game.physics.arcade.angleBetween(
					this.turret, target);
			this.fire(this.turret, target);
		},

		bulletsHitEmeniesHandler : function(target, bullet) {
			var lockedTarget = this.lockTarget(target);
			if (lockedTarget) {
				lockedTarget.damage(1);
			}
			bullet.kill();
		}
	};

	return Tower;
});