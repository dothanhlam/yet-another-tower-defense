/**
 * 
 */

define(
		[ "phaser", "helper/config", "helper/game-save", "screen/boot", "screen/preloader",
				"screen/menu", "screen/play", "screen/result" ],
		function(Phaser, config, user, Boot, Preloader, Menu, Play, Result) {
			var instance = null;

			function TowerDefense() {
				if (instance !== null) {
					throw new Error(
							"Cannot instantiate more than one TowerDefense, use TowerDefense.getInstance()");
				}

				this.initialize();
			}

			TowerDefense.prototype = {
				initialize : function() {
					this.game = new Phaser.Game(config.width, config.height,
							Phaser.AUTO, "", {
								preload : this.preload.bind(this),
								create : this.create.bind(this)
							});

				},

				preload : function() {
					// preload
				},

				create : function() {
					this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
					this.game.scale.minWidth = config.width / 4;
					this.game.scale.minHeight = config.height / 4;
					this.game.scale.maxWidth = config.width * 2;
					this.game.scale.maxHeight = config.height * 2;
					this.game.scale.pageAlignHorizontally = true;
					this.game.scale.refresh();

					this.start();
				},

				start : function() {
					this.game.state.add("Boot", new Boot(this.game));
					this.game.state.add("Preloader", new Preloader(this.game));
					this.game.state.add("Menu", new Menu(this.game));
					this.game.state.add("Play", new Play(this.game));
					this.game.state.add("Result", new Result(this.game));

					this.game.state.start("Boot");
				}
			};

			TowerDefense.getInstance = function() {
				if (instance === null) {
					instance = new TowerDefense();
				}
				return instance;
			};

			return TowerDefense.getInstance();
		});