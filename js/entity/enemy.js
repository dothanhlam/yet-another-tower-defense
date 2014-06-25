/**
 * 
 */

define(function() {

	Enemy = function(game, spriteName, x, y) {
		this.game = game;
		this.lastDir = "";
		this.sprite = this.game.add.sprite(x*32 + 16, y*32 + 16, spriteName);
		this.game.physics.enable(this.sprite);
		
	//	this.sprite.body.setSize(32, 32, 16, 16);
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.linearDamping = 1;
		this.sprite.body.collideWorldBounds = true;
		
		this.sprite.anchor.setTo(0.5, 0.5);
		
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;
		
		this.sprite.body.velocity.x = 64;

	};
	
	Enemy.prototype = {
			init : function() {

			},
			
			update : function() {
				
			}
	};
	
	return Enemy;
});