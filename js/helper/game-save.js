/**
 * 
 */

define({
	level: 1,
    money: 1000,
    defense: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    
    toJSON: function() {
    	return JSON.stringify({
    	    level: this.level,
    	    money: this.money,
    	    defense: this.defense
    	});
    },
    
    fromJSON: function(game) {
    	this.level = game.level;
    	this.money = game.money;
    	this.defense = game.defense;    	
    }
});