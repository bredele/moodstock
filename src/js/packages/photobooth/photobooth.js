define(["text!./templates/photobooth.html", "OObject", "Event.plugin"], function(html, Widget, Event){
	return function BoothWidgetConstructor(){
		var widget = new Widget(),
			streaming = false,
			canvas = null,
			video = null,
			init = function(){
				navigator.getMedia =(navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);


				navigator.getMedia(
					{
						video: true,
						audio: false
					},
					function(stream){
						if (navigator.mozGetUserMedia) {
								video.mozSrcObject = stream;
						} else {
							var vendorURL = window.URL || window.webkitURL;
							video.src = vendorURL.createObjectURL(stream);
						}

						video.play();
					},
					function(err){
						console.log("An error occured! " + err);
					}
				);
			};


		widget.template = html;

		//don't forget to use pointer
		widget.plugins.addAll({
			"event" :  new Event({
				active : function(){
					init();
				},
				play : function(){
					if (!streaming) {
						//height = video.videoHeight / (video.videoWidth/150);
						//video.setAttribute('width', 200);
						//video.setAttribute('height', 200);
						//canvas.setAttribute('width', 200);
						//canvas.setAttribute('height', 200);
						streaming = true;
					}
				}
			}),
			"node" : {
				video : function(node){
					video = node;
				},
				canvas : function(node){
					canvas = node;
				}
			}
		});

		widget.place(document.querySelector(".dashboard"));


		//return widget
	};
});

	