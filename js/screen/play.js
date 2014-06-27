/**
 * 
 */
define([ "entity/enemy", "entity/tower", "entity/player" ], function(Enemy,
		Tower, Player) {

	Play = function(game) {
		this.game = game;
		this.map = null;
		this.layer = null;

		this.player = null;
		this.towers = [];
		this.enemies = [];

		this.gamePause = false;
	};

	Play.prototype = {	
		preload : function() {
		},

		create : function() {

			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.map = this.game.add.tilemap('default');
			this.map.addTilesetImage('default', 'tiles', 32, 32, 0, 0, 1);

			this.layer = this.map.createLayer("World");
			this.layer.resizeWorld();
			this.map.setCollision([ 17 ]);

			this.enemiesGroup = this.game.add.group();
			this.towersGroup = this.game.add.group();

			this.addEnemy();
			this.addPlayer();

			this.start();
		},

		update : function() {

			if (this.gamePause == true)
				return;

			var i;
			for (i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i].alive) {
					this.enemies[i].update();
				} else {
					this.player.collect(this.enemies[i]);
					this.enemies.splice(i, 1);
				}
			}

			for (i = 0; i < this.towers.length; i++) {
				this.towers[i].update(this.enemies);
			}
		},

		toggleInventory : function(enableInventoryMode) {
			enableInventoryMode ? this.game.input.onDown
					.add(this.addItem, this) : this.game.input.onDown.remove(
					this.addItem, this);
		},

		addItem : function() {
			
			var tileX = this.layer
					.getTileX(this.game.input.activePointer.worldX);
			var tileY = this.layer
					.getTileY(this.game.input.activePointer.worldY);
			
			
			if (this.map.getTile(tileX, tileY, this.layer, true).index == 16) {
				return;
			}			
			
			if (this.player.money - 20 < 0) {
				// insufficient money supply
				return;
			}
			var tower = new Tower(this.game, this.towersGroup, tileX, tileY, 1,
					20);

			this.towers.push(tower);
			this.player.buyTower(tower);
		},

		addEnemy : function() {
			var index = this.enemies.length;
			this.enemies
					.push(new Enemy(this.game, this.layer, this.enemiesGroup,
							this.map, index, 16, 'car', 0, 2, 64, 20, 5));
		},

		addPlayer : function() {
			this.player = new Player(this.game, this.layer, this);
		},

		start : function() {
			var self = this;
			self.interval = setInterval(function() {
				self.addEnemy();
			}, 2000);
		},

		pause : function() {
			clearInterval(this.interval);
			delete this.interval;
			this.gamePause = true;
			this.towersGroup.exists = !this.gamePause;
			this.enemiesGroup.exists = !this.gamePause;
		},

		resume : function() {
			if (!this.interval)
				this.start();
			this.gamePause = false;
			this.towersGroup.exists = !this.gamePause;
			this.enemiesGroup.exists = !this.gamePause;
		}
	};

	return Play;
});