/**
 * 
 */

define(function() {
	
	 Player = function(game, layer, playScene, waves, health) {
		this.game = game;
		this.layer = layer;
		this.playScene = playScene;
		this.waves = waves;
		this.totalWaves = waves.length;
		
		this.paused = false;
		this.inventoriesToggled = false;
		
		this.health = health;
		this.totalHealth = health;
		
		var transparentPanelGraphics = this.game.add.graphics(0, 0);
		this.graphics = this.game.add.graphics(0, 0);
		var items = this.game.add.group();
		
		var inventoryItems = this.game.add.group();
		transparentPanelGraphics.lineStyle(0);
		transparentPanelGraphics.beginFill(0x0, 0.3);
		transparentPanelGraphics.drawRect(0, 0, 100, 25);
		transparentPanelGraphics.drawRect(110, 0, 100, 25);
		transparentPanelGraphics.drawRect(220, 0, 100, 25);
		transparentPanelGraphics.drawRect(330, 0, 100, 25);
		transparentPanelGraphics.drawRect(this.game.width - 110, 0, 100, 25);
		transparentPanelGraphics.endFill();

		items.create((this.game.width - 256)/2, this.game.height - 32, 'panel');

		this.scoreText = new Phaser.Text(this.game, 20, 0,
				this.zeroLeading(0, 4), {
					'font' : '22px Helvetica',
					fill : '#fff'
				});
		items.add(this.scoreText);

		this.wavesText = new Phaser.Text(this.game,  this.game.width - 280, 0,
				"00 / " + this.zeroLeading(this.waves.length, 2), {
					'font' : '22px Helvetica',
					fill : '#fff'
				});
		items.add(this.wavesText);
		
		this.moneyText = new Phaser.Text(this.game, this.game.width - 90, 0, this
				.zeroLeading(0, 6), {
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

		this.selectedTower = null;
		
		var tower1 = inventoryItems.create(0, 0, 'tanks', 'turret');
		tower1.scale.x = tower1.scale.y = 0.7;
		tower1.range = 1;
		tower1.cost = 20;
		tower1.type = "turret";
		tower1.inputEnabled = true; 
		tower1.events.onInputDown.add(this.inventoriesClickHandler, this);

		var tower2 = inventoryItems.create(0, 0, 'tanks', 'tank1');
		tower2.scale.x = tower2.scale.y = 0.4;
		tower2.range = 2;
		tower2.cost = 25;
		tower2.type = "tank1";
		tower2.inputEnabled = true; 
		tower2.events.onInputDown.add(this.inventoriesClickHandler, this);
		tower2.x = 40;
		tower2.y = 0;
		
		var tower3 = inventoryItems.create(0, 0, 'tanks', 'tank2');
		tower3.scale.x = tower3.scale.y = 0.4;
		tower3.range = 3;
		tower3.cost = 30;
		tower3.type = "tank2";
		tower3.inputEnabled = true; 
		tower3.events.onInputDown.add(this.inventoriesClickHandler, this);
		tower3.x = 70;
		tower3.y = 0;
		
		var tower4 = inventoryItems.create(0, 0, 'tanks', 'tank3');
		tower4.scale.x = tower4.scale.y = 0.4;
		tower4.range = 4;
		tower4.cost = 35;
		tower4.type = "tank3";
		tower4.inputEnabled = true; 
		tower4.events.onInputDown.add(this.inventoriesClickHandler, this);
		tower4.x = 100;
		tower4.y = 0;
		
		var tower5 = inventoryItems.create(0, 0, 'tanks', 'tank4');
		tower5.scale.x = tower5.scale.y = 0.4;
		tower5.range = 5;
		tower5.cost = 40;
		tower5.type = "tank4";
		tower5.inputEnabled = true; 
		tower5.events.onInputDown.add(this.inventoriesClickHandler, this);
		tower5.x = 130;
		tower5.y = 0;
		
		inventoryItems.x = (this.game.width - 150)/2;
		inventoryItems.y = (this.game.height - 28);
				
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
			this.graphics.moveTo(this.scoreText.x + 100, (this.scoreText.height-10)/2 + 5);
		    this.graphics.lineTo(this.scoreText.x + 100 +  (50 * percent), (this.scoreText.height-10)/2  + 5);
			this.graphics.lineStyle(2, 0xFFFF00, 1);
			this.graphics.drawRect(this.scoreText.x + 100, (this.scoreText.height-10)/2 , 50, 10);			
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
			this.moneyText.text = this.zeroLeading(this.money, 6);
			this.scoreText.text = this.zeroLeading(this.score, 4);
		},
		
		showNextWave: function(wave) {
			this.wavesText.text = this.zeroLeading(wave,2) + " / " + this.zeroLeading(this.totalWaves, 2);
		},

		inventoriesClickHandler: function(target) {
			if (this.selectedTower) {
				this.selectedTower.blendMode = PIXI.blendModes.NORMAL;
			}
			
			this.inventoriesToggled = this.selectedTower != target;
			this.selectedTower = target;
			this.selectedTower.blendMode = this.inventoriesToggled ? PIXI.blendModes.ADD : PIXI.blendModes.NORMAL;
			
			this.playScene.toggleInventory(this.inventoriesToggled, this.selectedTower);			
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