define(["text!./templates/photobooth.html", "OObject", "Event.plugin"], 

	function(html, Widget, Event){

		return function BoothWidgetConstructor($sandbox){

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
							widget.dom.classList.add("ready");
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
						if(!streaming){
							init();
						} 
					},
					close : function(){
						//:s
						widget.dom.classList.remove("ready");

						video.src = "";
						canvas.getContext('2d').clearRect ( 0 , 0 , 250 , 188);
						streaming = false;
					},
					play : function(){
						streaming = true;
					},
					take : function(event){
						var date = new Date();
						//size should be configurable
						canvas.getContext('2d').drawImage(video, 0, 0, 250, 188);
						var data = canvas.toDataURL('image/png');
						var pic = {
							mood : widget.mood,
							data : data,
							date : date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear()

						};
						
						//emit signal take photo
						$sandbox.emit("booth", pic);
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

			//set init with config
			widget.mood = "happy";

			return widget;
		};
	}
);

	