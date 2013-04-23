define(["text!./templates/slideshow.html", "OObject", "LocalStore", "Bind.plugin", "Event.plugin"], function(html, Widget, Store, Bind, Event){
	return function SlideshowWidgetContructor(){

		var widget = new Widget(),
			store = new Store([]);
			nbItems = 0;

		store.sync("moodstock-booth");

		nbItems = store.getNbItems();

		if(nbItems > 0) {
			widget.model.set("img", store.get(nbItems - 1).data);
		}

		widget.template = html;

		widget.plugins.addAll({
			"model" : new Bind(widget.model),
			"list" : new Bind(store),
			"event" : new Event({
				setFrame : function(event, node){
					var target = event.target;
					//use control plugin
					if(target.nodeName === "IMG"){
						widget.model.set("img", store.get(target.getAttribute("data-list_id")).data);
					}
				}
			})

		});

		widget.reset = function(data){
			console.log(store.toJSON());
			widget.model.set("img", data.data);
			var i = store.getNbItems();
			//:s localstore not efficient
			if(i > 18) {
				store.del(0);
				store.set(18, data);
			} else {
				try {
					store.alter("push", data);
				} catch(e) {
					console.log(e);
				}
			}

		};
	
		//to configure
		widget.place(document.querySelector(".row"));

		return widget;
	};
});