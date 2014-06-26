/**
 * 
 */
define([], function() {
    
	function Menu(game) {
		this.game = game;
		this.menu = [];
	}

	Menu.prototype = {
		preload : function() {    
		},

		create : function() {						
			this.createItem(5, "Play", "Play");
			this.createItem(3, "Settings", "Settings");			
			this.createItem(1, "Help", "Help");
		},     
        
        update : function() {                  
        },   
        
        createItem: function(index, text, action) {
        	var item = this.game.add.group();
        	var estimatedWidth = text.length * 10;
        	
        	var itemSprite = item.create((this.game.width - 256) / 2, (this.game.height - 32) / 2 - 32 * index ,'menu'); // adding a sprite
        	itemSprite.name = "item_" + index;
        	this.menu[itemSprite.name] = action;
            var itemText = new Phaser.Text(this.game, (this.game.width - estimatedWidth) / 2, (this.game.height - 31) / 2 - 31 *index - 3, text, { 'font': '22px Helvetica', fill: '#fff' });
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