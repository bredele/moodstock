define(["./mood"],
	/*
	* @class
	* Mood package.
	*/
	function(Mood){

		return function MoodConstructor($sandbox){
			console.log("mood");
			Mood($sandbox);
			//init state, Mood should have this state as param
			//only works if mood is initiated after flickr
			$sandbox.emit("mood", "happy");
		};
	}
);