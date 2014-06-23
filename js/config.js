/**
 * config.js
 * Loading existed configuration from local storage 
 */
define(["game/tower-defense", "helper/config", "helper/game-save"], function(TowerDefense, Config, User){
	
	var config = JSON.parse(localStorage.getItem('config'));

	if (config == null) {
		localStorage.setItem("config", Config.toJSON());
	}
	
	var user = JSON.parse(localStorage.getItem('user'));
	if (user == null) {
		localStorage.setItem("user", User.toJSON());
	}

	Config.fromJSON(config);
	User.fromJSON(user);
});