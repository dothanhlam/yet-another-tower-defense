/**
 * 
 */

define(function() {
	 Player = function(game, layer, playScene, health) {
		this.game = game;
		this.layer = layer;
		this.playScene = playScene;
		this.paused = false;
		this.inventoriesToggled = false;
		
		this.health = health;
		this.totalHealth = health;
		
		var items = this.game.add.group();
		var inventoryItems = this.game.add.group();

		items.create((this.game.width - 256)/2, this.game.height - 32, 'panel');

		this.scoreText = new Phaser.Text(this.game, 10, 0,
				this.zeroLeading(0, 4), {
					'font' : '22px Helvetica',
					fill : '#fff'
				});
		items.add(this.scoreText);

		this.moneyText = new Phaser.Text(this.game, this.game.width - 70, 0, this
				.zeroLeading(0, 4)
				+ " $", {
			'font' : '22px Helvetica',
			fill : '#fff'
		});
		
		items.add(this.moneyText);

	/*	this.game.add.button(game.world.centerX - 48, 24, 'play',
				this.buttonClickHandler, this).anchor.setTo(0.5, 0.5);
		this.game.add.button(game.world.centerX, 24, 'options',
				this.buttonClickHandler, this).anchor.setTo(0.5, 0.5);
		this.game.add.button(game.world.centerX + 48, 24, 'quit',
				this.buttonClickHandler, this).anchor.setTo(0.5, 0.5); */

		var tower1 = inventoryItems.create(0, 0, 'tanks', 'turret');
		tower1.scale.x = tower1.scale.y = 0.7;
		tower1.name = "basic";
		tower1.inputEnabled = true; 
		tower1.events.onInputDown.add(this.inventoriesClickHandler, this);

		var tower2 = inventoryItems.create(0, 0, 'tanks', 'tank1');
		tower2.scale.x = tower2.scale.y = 0.4;
		tower2.name = "basic";
		tower2.x = 40;
		tower2.y = 0;
		
		//tower2.inputEnabled = true; 
	//	tower1.events.onInputDown.add(this.inventoriesClickHandler, this);
		
		inventoryItems.x = (this.game.width - 150)/2;
		inventoryItems.y = (this.game.height - 28);
		
		this.graphics = this.game.add.graphics(0, 0);
				
		//player
		this.collect(null);		
		this.updateHealth(0);
	};

	Player.prototype = {
	
			updateHealth: function(val) {
			this.health += val;
			var percent = this.health / this.totalHealth;
			this.graphics.clear();
			this.graphics.lineStyle(10, this.health < 50 ? 0xFF0000 : 0x00FF00, 1);
			this.graphics.moveTo(this.scoreText.x + 80, (this.scoreText.height-10)/2 + 5);
		    this.graphics.lineTo(this.scoreText.x + 80 +  (50 * percent), (this.scoreText.height-10)/2  + 5);
			this.graphics.lineStyle(2, 0xFFFF00, 1);
			this.graphics.drawRect(this.scoreText.x + 80, (this.scoreText.height-10)/2 , 50, 10);			
		},
		
		
		sellTower: function(tower) {
			
		},	
			
		buyTower: function(tower) {
			this.money -= tower.cost;
			this.update();
		},
		
		collect : function(enemy) {
			if (enemy) {
				if (!enemy.selfKilling) {
					this.money += enemy.earning;
					this.score ++;
				}
				else {
					this.updateHealth(-10); // actually update
					
					if (this.health <= 0) {
						// GAME OVER
						// GOTO high score or menu
						this.playScene.gameOver();
					}
				}
			}
			else {
				this.money = 100;
				this.score = 0;
			}
			this.update();
		},

		
		update : function() {			
			this.moneyText.text = this.zeroLeading(this.money, 4) + " $";
			this.scoreText.text = this.zeroLeading(this.score, 4);
		},

		inventoriesClickHandler: function(target) {
			this.inventoriesToggled = !this.inventoriesToggled;
			this.playScene.toggleInventory(this.inventoriesToggled);
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