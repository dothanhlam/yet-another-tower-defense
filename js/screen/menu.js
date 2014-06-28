/**
 * 
 */
define([], function() {
    
	Menu = function(game) {
		this.game = game;
		this.menu = [];
	};

	Menu.prototype = {
		preload : function() {    
		},

		create : function() {	
			this.game.add.image(0, 0, "background").alpha = 0.5;
			
			this.createItem(5, "Play", "Play");
			this.createItem(3, "Resume", "Play");
			this.createItem(1, "Top Scores", "Play");			
			this.createItem(-1, "Settings", "Settings");			
			this.createItem(-3, "Help", "Help");
		},     
        
        update : function() {                  
        },   
        
        createItem: function(index, text, action) {
        	
        	var item = this.game.add.group();
        	
        	var itemSprite = item.create((this.game.width - 256) / 2, (this.game.height + 32) / 2 - 32 * index ,'panel'); // adding a sprite
        	itemSprite.name = "item_" + index;
        	this.menu[itemSprite.name] = action;
            var itemText = new Phaser.Text(this.game, 0, 0, text, { 'font': '22px Helvetica', fill: '#fff' });
            itemText.x = (this.game.width - itemText.width) / 2;
            itemText.y = (this.game.height - itemText.height) / 2 - 32 *index + 32 ;
            item.add(itemText);
                        
            itemSprite.inputEnabled=true;            
            itemSprite.events.onInputDown.add(this.listener,this);            
        	return item;
        },
        
        listener: function(sprite, pointer) {
        	this.game.state.start(this.menu[sprite.name]);
        }
	};

	return Menu;
});