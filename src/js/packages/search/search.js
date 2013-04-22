define(["text!./templates/search.html", "OObject", "Bind.plugin"], function(html, Widget, Bind){
	return function SearchWidgetContructor(){
		var widget = new Widget();

		widget.template = html;

		widget.plugins.add("model", new Bind(widget.model, {
			//don't need that if icons don't start by icon
			mood : function(mood){
				this.className = "icon-" + mood;
			}
		}));

		//to configure
		widget.place(document.querySelector(".photos"));

		return widget;
	};
});