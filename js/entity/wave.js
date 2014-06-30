/**
 * 
 */

define([], function() {

	Wave = function () {
		this.incoming =  1000;
		this.enemy =  'hunter';
		this.speed = 64;
		this.health = 20;
		this.earning = 5;
		this.nums = 5;
		this.delay = 2000;
	};

	Wave.prototype = {
		preload : function() {
		},

		create : function() {

		},
		
		getEnemy: function() {
		
		}
	};

	return Wave;
});