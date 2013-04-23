define(["./photobooth"],
	/*
	* @class
	* Photobooth package.
	*/
	function(Widget){
		return function PhotoBoothConstructor($sandbox){
			var widget = new Widget($sandbox);
			$sandbox.on("mood:mood", function(mood){
				widget.mood = mood;
			});
		};
	}
);
