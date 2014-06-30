/**
 * 
 */
define([ "entity/enemy", "entity/tower", "entity/player" ], function(Enemy,
		Tower, Player) {

	Play = function(game) {
		this.waves = [ {
			incoming: 1000,
			enemy : 'hunter',
			speed : 64,
			health : 20,
			earning : 5,
			nums : 2,
			delay : 2000
		}, {
			incoming: 10000,
			enemy : 'harpoon',
			speed : 128,
			health : 10,
			earning : 5,
			nums : 2,
			delay : 3000
		}, {
			incoming: 1000,
			enemy : 'spacker',
			speed : 64,
			health : 30,
			earning : 10,
			nums : 2,
			delay : 2000
		} ];

		this.waves.reverse();
		this.currentWave = null;
		this.waveCounting = 1;
		
		this.game = game;
		this.map = null;
		this.layer = null;

		this.player = null;
		this.towers = [];
		this.towersLocation = [];
		this.enemies = [];

		this.destinationCell = {
			x : 19,
			y : 2
		};

		this.nextWaveInterval = null;
		
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
			this.map.setCollision([ 17, 31, 1, 5, 30, 13, 27, 9, 22, 27, 8, 4,
					20, 28, 11, 6 ]);

			this.enemiesGroup = this.game.add.group();
			this.towersGroup = this.game.add.group();

			this.addPlayer();

			this.startWave();
		},

		update : function() {
			if (this.gamePause) {
				return;
			}
					
			var i;
			for (i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i].alive) {
					this.enemies[i].update();
				} else {
					this.player.collect(this.enemies[i]);
					this.enemies.splice(i, 1);
					
					if (this.waves.length == 0 && this.enemies.length == 0) { // stupid check
						this.gameOver();
					}
				}
			}

			for (i = 0; i < this.towers.length; i++) {
				this.towers[i].update(this.enemies);
			}
		},

		toggleInventory : function(enableInventoryMode) {
			enableInventoryMode ? this.game.input.onDown.add(this.towerHandler,
					this) : this.game.input.onDown.remove(this.towerHandler,
					this);
		},

		towerHandler : function() {

			var tileX = this.layer
					.getTileX(this.game.input.activePointer.worldX);
			var tileY = this.layer
					.getTileY(this.game.input.activePointer.worldY);

			if (tileX == 0 || tileX == 19 || tileY == 0 || tileY == 14) {
				// foolish boundary checking
				return;
			}

			if (this.map.getTile(tileX, tileY, this.layer, true).index == 16) {
				return;
			}

			if (this.towersLocation[tileX + "_" + tileY] != null) {
				console.log('sell this tower');
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
			this.towersLocation[tileX + "_" + tileY] = tower;
		},

		addEnemy : function() {
			this.currentWave.nums --;
			if (this.currentWave.nums < 0) {
				// ending wave, next incoming
				clearInterval(this.enemyInterval);
				delete this.enemyInterval;
				this.startWave();
				return;
			}
			var index = this.enemies.length;
			this.enemies.push(new Enemy(this.game, this.layer,
					this.enemiesGroup, this.map, index, 16, this.currentWave.enemy, 0, 2, this.currentWave.speed,
					this.currentWave.health, this.currentWave.earning, this.destinationCell));
		},

		addPlayer : function() {
			this.player = new Player(this.game, this.layer, this, this.waves, 100);
		},

		
		startWave: function() {
			
			this.currentWave = this.waves.pop();
			if (this.currentWave == null) {
				// no more wave
				
				return;
			}
			var self = this;
			setTimeout(function() {
				self.player.showNextWave(self.waveCounting ++);
				self.start();
				}, 
				this.currentWave.incoming);			
		},
		
		
		start : function() {
			var self = this;
			self.enemyInterval = setInterval(function() {
				self.addEnemy();
			}, this.currentWave.delay);
		},

		pause : function() {
			clearInterval(this.enemyInterval);
			delete this.enemyInterval;
			this.gamePause = true;
			this.towersGroup.exists = !this.gamePause;
			this.enemiesGroup.exists = !this.gamePause;
		},

		resume : function() {
			if (!this.enemyInterval) {
				this.start();
			}
			this.gamePause = false;
			this.towersGroup.exists = !this.gamePause;
			this.enemiesGroup.exists = !this.gamePause;
		},

		gameOver : function() {
			clearInterval(this.enemyInterval);
			delete this.enemyInterval;

			this.game.state.start('Menu');
		}
	};

	return Play;
});