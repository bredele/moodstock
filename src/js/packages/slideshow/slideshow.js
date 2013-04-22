define(["text!./templates/slideshow.html", "OObject"], function(html, Widget){
	return function SlideshowWidgetContructor(){
		var widget = new Widget();

		widget.template = html;

	
		//to configure
		widget.place(document.querySelector(".dashboard"));

		return widget;
	};
});