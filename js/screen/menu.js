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
            menuPlay.name = "play";
             menuPlay.inputEnabled = true;
            arrMenu.push(menuPlay);
            
            menuItem = this.game.add.sprite(this.game.world.centerX,currentPosY+34,'item');
            menuItem.anchor.setTo(0.5, 0.5);
             menuItem.inputEnabled = true;
            menuItem.name = "item";
            arrMenu.push(menuItem);
            menuOption = this.game.add.sprite(this.game.world.centerX,currentPosY+68,'option');
            menuOption.anchor.setTo(0.5, 0.5);
            menuOption.inputEnabled = true;
             arrMenu.push(menuOption);
            menuHelp = this.game.add.sprite(this.game.world.centerX,currentPosY+102,'help');
            menuHelp.anchor.setTo(0.5, 0.5);
            menuHelp.inputEnabled = true;
             arrMenu.push(menuHelp);
            menuExit = this.game.add.sprite(this.game.world.centerX,currentPosY+138,'exit');
            menuExit.anchor.setTo(0.5, 0.5);
            menuExit.inputEnabled = true;
            arrMenu.push(menuExit);
            
           for (var i = 0; i < arrMenu.length; i++)
           {
                arrMenu[i].events.onInputDown.add(this.onclick, this);
                arrMenu[i].events.onInputOver.add(this.onMouseHover( arrMenu[i]), this);
                arrMenu[i].events.onInputOut.add(this.onMouseOut(arrMenu[i]), this);
           }
            
            
		},
        onclick: function(obj){
            console.log(obj);
          //this.game.state.start('Play');
        },
        
        onMouseHover: function(menu){
            menu.input.useHandCursor = true;
        },
        
        onMouseOut: function(menu){
            menu.input.useHandCursor = false;
        },
        
        update : function() {
            
           

        },
      
	};

	return Menu;
});