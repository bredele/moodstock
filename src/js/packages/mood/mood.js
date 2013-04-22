define(["OObject", "Event.plugin"], function(Widget, Event){

	return function MoodWidgetConstructor($sandbox){

		var widget = new Widget(),
			//to configure
			node = document.body,
			//not good! use model instead
			smiley = document.querySelector(".smiley"),
			moods = ["happy", "soso", "depress", "sad", "mad"],
			current = "happy",
			//to refactor (left and right are the same)
			actions = {
				left : function(){
					node.classList.remove(current);
					smiley.classList.remove("icon-" + current);

					var index = moods.indexOf(current) - 1,
						length = moods.length;

					if(index < 0) {
						index = length - 1;
					}

					current = moods[index];
					node.classList.add(current);

					//
					smiley.classList.add("icon-" + current);
					$sandbox.emit("mood", current);

				},
				right : function(){
					node.classList.remove(current);
					smiley.classList.remove("icon-" + current);


					var index = moods.indexOf(current) + 1,
						length = moods.length;

					if(index === length){
						index = 0;
					}
					current = moods[index];
					node.classList.add(current);

					smiley.classList.add("icon-" + current);
					$sandbox.emit("mood", current);
				}
			};


		window.addEventListener("keydown", function(event){
			var keyCode = event.keyCode;
			if(keyCode === 39){
				actions.right();
			} else if(keyCode === 37 ){
				actions.left();
			}
		
		});

		//should we use delegation?
		widget.plugins.add("event", new Event(actions));

		widget.alive(node);
	};
});