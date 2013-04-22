define(["text!./templates/soundcloud.html", "OObject"], function(html, Widget){
	return function SoundCloudConstructor(){
		var widget = new Widget(),
			iframe = document.createElement("iframe"),
			content = encodeURIComponent(html);

		iframe.src = "data:text/html;charset=utf-8," + content;
		widget.setTemplateFromDom(iframe);

		widget.place(document.querySelector(".container"));
	};
});