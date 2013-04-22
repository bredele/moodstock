define(["./search"],
	/*
	* @class
	* Search package.
	*/
	function(Search){
		return function SearchConstructor($sandbox){
			var widget = new Search();
			$sandbox.on("mood:mood", function(mood){
				widget.model.set("mood", mood);
			});
		};
	}
);