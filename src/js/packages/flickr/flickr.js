define(["text!./templates/flickr.html", "OObject", "Bind.plugin"], function(html, Widget, Bind){
	return function FlickrWidgetConstructor(){
		var widget = new Widget();

		widget.template = html;

		widget.plugins.add("model", new Bind(widget.model, {
			file : function(media){
				this.src =  media.replace(/_m/g,'_s');
			}
		}));

		window.jsonFlickrFeed = function(test){
			//to allow transitions
			widget.model.reset([]);
			//animation...it seems there is a cost layout (not the animation)
			var i = 0,
				interval = setInterval(function(){
					widget.model.alter("push", test.items[i]);
					i++;
					if(i === test.items.length){
						clearInterval(interval);
						i = 0;
					}
			}, 30);
			//widget.model.reset(test.items);
		};

		widget.reset = function(tag){
			//math.random force http request...may be put random tag
			require(['http://api.flickr.com/services/feeds/photos_public.gne?tags=' + tag + '&format=json&' + Math.random()], function(json){
				//domething?
			});
		};

		//we could put images in footer
		widget.place(document.querySelector(".mosaic"));

		return widget;
	};
});