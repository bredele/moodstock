define(["./slideshow"],
	/*
	* @class
	* Search package.
	*/
	function(Widget){
		return function SlideshowConstructor($sandbox){
			var widget = new Widget();

			$sandbox.on("photobooth:booth", function(data){
				widget.reset(data);
			});
		};
	}
);