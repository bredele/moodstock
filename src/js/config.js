requirejs.config({
	baseUrl : "src/js/packages",
	packages : ["mood", "search", "flickr", "photobooth", "slideshow"],
	paths : {
		lib : "../lib",
		core : "../core",
		text : "../lib/text",
		json : "../lib/json"
	}
});

//bootstrap
require(["lib/emily", "lib/olives"], function(){
	//we have to be sure that emily has been loaded to use Tools
	require(["core/core", "Observable"], function(Core, Observer){
		var core = new Core(),
			observer = new Observer();

		core.setObserver(observer);
		core.start([{
			name : "mood",
			options : []
		}, {
			name : "search",
			options : []
		}, {
			name : "flickr",
			options : []
		},
		{
			name : "photobooth",
			options : []
		},
		{
			name : "slideshow",
			options : []
		}]);
	});
});
