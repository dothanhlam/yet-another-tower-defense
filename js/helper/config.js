/**
 * 
 */

define({
    width: 1024,
    height : 768,
    
    app_name: 'Yet Another Tower Defense',
    api_key: 'N/A',
    
    toJSON: function() {
    	return JSON.stringify({
    	    app_name: this.app_name,
    	    api_key: this.api_key,
    	    width: this.width,
    	    height: this.height
    	});
    },
    
    fromJSON: function(config) {
    	this.app_name = config.app_name;
    	this.api_key = config.api_key;
    	this.width = config.width;
    	this.height = config.height;
    }
});	