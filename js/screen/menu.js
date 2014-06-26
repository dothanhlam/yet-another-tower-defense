/**
 * 
 */
define([], function() {
    var menuPlay;
    var menuItem;
    var menuOption;
    var menuHelp;
    var menuExit;
    var arrMenu = [];

	function Menu(game) {
		this.game = game;
                 
	}

	Menu.prototype = {
		preload : function() {
            this.game.load.image('play','assets/menu/menu-play.png');
            this.game.load.image('item','assets/menu/menu-item.png');
            this.game.load.image('option','assets/menu/menu-option.png');
            this.game.load.image('help','assets/menu/menu-help.png');
            this.game.load.image('exit','assets/menu/menu-exit.png');
		},

		create : function() {
            var currentPosY = this.game.world.centerY - 75;
            menuPlay = this.game.add.sprite(this.game.world.centerX,currentPosY,'play');
            menuPlay.anchor.setTo(0.5, 0.5);
             menuPlay.inputEnabled = true;
          
            
            menuItem = this.game.add.sprite(this.game.world.centerX,currentPosY+34,'item');
            menuItem.anchor.setTo(0.5, 0.5);
            menuItem.inputEnabled = true;

            menuOption = this.game.add.sprite(this.game.world.centerX,currentPosY+68,'option');
            menuOption.anchor.setTo(0.5, 0.5);
            menuOption.inputEnabled = true;

            menuHelp = this.game.add.sprite(this.game.world.centerX,currentPosY+102,'help');
            menuHelp.anchor.setTo(0.5, 0.5);
            menuHelp.inputEnabled = true;
   
             
            menuExit = this.game.add.sprite(this.game.world.centerX,currentPosY+138,'exit');
            menuExit.anchor.setTo(0.5, 0.5);
            menuExit.inputEnabled = true;
       
            
            // add event manual
            menuPlay.events.onInputDown.add(this.onPlaycClick, this);
            menuItem.events.onInputDown.add(this.onItemClick, this);
            menuOption.events.onInputDown.add(this.onOptioncClick, this);
            menuHelp.events.onInputDown.add(this.onPlaycClick, this);
            menuExit.events.onInputDown.add(this.onHelpClickClick, this);
            
            
		},
        onPlaycClick: function(obj){
            console.log(obj);
          this.game.state.start('Play');
        },
         onItemClick: function(obj){
            console.log('Item');
          //this.game.state.start('Play');
        },
          onOptioncClick: function(obj){
            console.log('Option');
          //this.game.state.start('Play');
        },
         onHelpClickClick: function(obj){
            console.log('Help');
          //this.game.state.start('Play');
        },
          onExitcClick: function(obj){
            console.log('Exit');
          //this.game.state.start('Play');
        },
        
        
       
        
        update : function() {
            
           

        },
      
	};

	return Menu;
});