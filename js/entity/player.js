/**
 * 
 */

define([], function() {
	function Player(game, layer, playScene) {
		this.game = game;
		this.layer = layer;
		this.playScene = playScene;
		this.paused = false;

		var items = this.game.add.group();
		var inventoryItems = this.game.add.group();

		items.create(0, this.game.height - 32, 'menu');
		items.create(this.game.width - 256, this.game.height - 32, 'menu');

		var scoreText = new Phaser.Text(this.game, 0, 0,
				this.zeroLeading(0, 6), {
					'font' : '22px Helvetica',
					fill : '#fff'
				});
		items.add(scoreText);

		var coinText = new Phaser.Text(this.game, this.game.width - 70, 0, this
				.zeroLeading(0, 4)
				+ " $", {
			'font' : '22px Helvetica',
			fill : '#fff'
		});
		items.add(coinText);

		this.game.add.button(game.world.centerX - 48, 24, 'play',
				this.buttonClickHandler, this).anchor.setTo(0.5, 0.5);
		this.game.add.button(game.world.centerX, 24, 'options',
				this.buttonClickHandler, this).anchor.setTo(0.5, 0.5);
		this.game.add.button(game.world.centerX + 48, 24, 'quit',
				this.buttonClickHandler, this).anchor.setTo(0.5, 0.5);

		var tower1 = inventoryItems.create(0, 0, 'tanks', 'turret');
		tower1.name = "basic";
		tower1.inputEnabled = true; 
		tower1.events.onInputDown.add(this.inventoriesClickHandler, this);

		inventoryItems.x = this.game.width - 200;
		inventoryItems.y = this.game.height - 32;
	}

	Player.prototype = {
		init : function() {
		},

		update : function(data) {
			scoreText.setTet(this.zeroLeading(100, 6));
		},

		inventoriesClickHandler: function(target) {
			this.playScene.enableInventoryMode = !this.playScene.enableInventoryMode;
		},
		
		buttonClickHandler : function(target) {
			switch (target.key) {
			case "play":
				this.paused = !this.paused;
				this.paused ? this.playScene.pause() : this.playScene.resume();
				break;

			case "options":
				break;

			case "quit":
				break;
			}
		},

		zeroLeading : function(num, places) {
			var zero = places - num.toString().length + 1;
			return Array(+(zero > 0 && zero)).join("0") + num;
		}
	};

	return Player;
});