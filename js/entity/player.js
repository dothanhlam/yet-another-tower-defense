/**
 * 
 */

define([], function() {
	function Player(game, layer) {
		this.game = game;
		this.layer = layer;
		
    	var items = this.game.add.group();
    	items.create(0, this.game.height - 32 ,'menu');
    	items.create(this.game.width - 256, this.game.height - 32 ,'menu');

    	var scoreText = new Phaser.Text(this.game, 0, 0, "0000", { 'font': '22px Helvetica', fill: '#fff' });
        items.add(scoreText);
        
        var coinText = new Phaser.Text(this.game, this.game.width - 70, 0, "0000 $", { 'font': '22px Helvetica', fill: '#fff' });
        items.add(coinText);        
	}

	Player.prototype = {
		init : function() {
		},
		
		update: function(data) {
			
		}
	};

	return Player;
});