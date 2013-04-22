define(["./flickr"],
	/*
	* @class
	* Flickr package.
	*/
	function(Widget){
		return function FlickrConstructor($sandbox){
			console.log("flickr");
			var widget = new Widget();
			$sandbox.on("mood:mood", function(mood){
				widget.reset(mood);
			});
		};
	}
);