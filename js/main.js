/**
 * 
 */

require.config({
    baseUrl:"js/",
    paths:{
        phaser: "lib/phaser"
    },

    shim:{
        phaser: {
            exports: 'Phaser'
        }
    }
});

require(['config']);