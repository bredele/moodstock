/*
 Olives <VERSION> http://flams.github.com/olives
 The MIT License (MIT)
 Copyright (c) 2012-2013 Olivier Scherrer <pode.fr@gmail.com> - Olivier Wietrich <olivier.wietrich@gmail.com>
*/
define("DomUtils",["Tools"],function(h){return{getNodes:function(c,d){return this.isAcceptedType(c)?(c.parentNode||document.createDocumentFragment().appendChild(c),c.parentNode.querySelectorAll(d||"*")):false},getDataset:function(c){var d=0,b,f={},e,a;if(this.isAcceptedType(c))if(c.hasOwnProperty("dataset"))return c.dataset;else{for(b=c.attributes.length;d<b;d++)e=c.attributes[d].name.split("-"),e.shift()=="data"&&(f[a=e.join("-")]=c.getAttribute("data-"+a));return f}else return false},isAcceptedType:function(c){return c instanceof
HTMLElement||c instanceof SVGElement?true:false},setAttribute:function(c,d,b){return c instanceof HTMLElement?(c[d]=b,true):c instanceof SVGElement?(c.setAttribute(d,b),true):false},matches:function(c,d,b){return h.toArray(this.getNodes(c,d)).indexOf(b)>-1}}});
define("Bind.plugin",["Store","Observable","Tools","DomUtils"],function(h,c,d,b){return function(c,e){var a=null,j={},k={};this.observers={};this.setModel=function(b){return b instanceof h?(a=b,true):false};this.getModel=function(){return a};this.ItemRenderer=function(l,i){var g=null,c=null,f=null,j=null,e=null;this.setRenderer=function(a){g=a;return true};this.getRenderer=function(){return g};this.setRootNode=function(a){return b.isAcceptedType(a)?(f=a,a=f.querySelector("*"),this.setRenderer(a),
a&&f.removeChild(a),true):false};this.getRootNode=function(){return f};this.setPlugins=function(a){c=a;return true};this.getPlugins=function(){return c};this.items=new h([]);this.setStart=function(a){return j=parseInt(a,10)};this.getStart=function(){return j};this.setNb=function(a){return e=a=="*"?a:parseInt(a,10)};this.getNb=function(){return e};this.addItem=function(a){var b;return typeof a=="number"&&!this.items.get(a)?(b=this.create(a))?((a=this.getNextItem(a))?f.insertBefore(b,a):f.appendChild(b),
true):false:false};this.getNextItem=function(a){return this.items.alter("slice",a+1).filter(function(a){if(b.isAcceptedType(a))return true})[0]};this.removeItem=function(a){var b=this.items.get(a);return b?(f.removeChild(b),this.items.set(a),true):false};this.create=function(i){if(a.has(i)){var l=g.cloneNode(true),f=b.getNodes(l);d.toArray(f).forEach(function(a){a.setAttribute("data-"+c.name+"_id",i)});this.items.set(i,l);c.apply(l);return l}};this.render=function(){var b=e=="*"?a.getNbItems():e,
i=[];if(e!==null&&j!==null){this.items.loop(function(l,g){(g<j||g>=j+b||!a.has(g))&&i.push(g)},this);i.sort(d.compareNumbers).reverse().forEach(this.removeItem,this);for(var l=j,g=b+j;l<g;l++)this.addItem(l);return true}else return false};this.setPlugins(l);this.setRootNode(i)};this.setItemRenderer=function(a,b){k[a||"default"]=b};this.getItemRenderer=function(a){return k[a]};this.foreach=function(b,i,g,c){var d=new this.ItemRenderer(this.plugins,b);d.setStart(g||0);d.setNb(c||"*");d.render();a.watch("added",
d.render,d);a.watch("deleted",function(b){d.render();this.observers[b]&&this.observers[b].forEach(function(b){a.unwatchValue(b)},this);delete this.observers[b]},this);this.setItemRenderer(i,d)};this.updateStart=function(a,b){var g=this.getItemRenderer(a);return g?(g.setStart(b),true):false};this.updateNb=function(a,b){var g=this.getItemRenderer(a);return g?(g.setNb(b),true):false};this.refresh=function(a){return(a=this.getItemRenderer(a))?(a.render(),true):false};this.bind=function(c,i,g){var g=g||
"",f=c.getAttribute("data-"+this.plugins.name+"_id"),j=g.split("."),e=f||j.shift(),k=f?g:j.join("."),f=d.getNestedProperty(a.get(e),k),h=d.toArray(arguments).slice(3);if(f||f===0||f===false)this.execBinding.apply(this,[c,i,f].concat(h))||b.setAttribute(c,i,f);this.hasBinding(i)||c.addEventListener("change",function(){a.has(e)&&(k?a.update(e,g,c[i]):a.set(e,c[i]))},true);this.observers[e]=this.observers[e]||[];this.observers[e].push(a.watchValue(e,function(a){this.execBinding.apply(this,[c,i,d.getNestedProperty(a,
k)].concat(h))||b.setAttribute(c,i,d.getNestedProperty(a,k))},this))};this.set=function(c){return b.isAcceptedType(c)&&c.name?(a.set(c.name,c.value),true):false};this.getItemIndex=function(a){return(a=b.getDataset(a))&&typeof a[this.plugins.name+"_id"]!="undefined"?+a[this.plugins.name+"_id"]:false};this.form=function i(i){if(i&&i.nodeName=="FORM"){var a=this;i.addEventListener("submit",function(b){d.toArray(i.querySelectorAll("[name]")).forEach(a.set,a);b.preventDefault()},true);return true}else return false};
this.addBinding=function(a,b){return a&&typeof a=="string"&&typeof b=="function"?(j[a]=b,true):false};this.execBinding=function(a,b){return this.hasBinding(b)?(j[b].apply(a,Array.prototype.slice.call(arguments,2)),true):false};this.hasBinding=function(a){return j.hasOwnProperty(a)};this.getBinding=function(a){return j[a]};this.addBindings=function(a){return d.loop(a,function(a,b){this.addBinding(b,a)},this)};this.setModel(c);this.addBindings(e)}});
define("Event.plugin",["DomUtils"],function(h){return function(c,d){var b=null,f={mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove"},e=!!d;this.addEventListener=function(a,b,c,d){a.addEventListener(this.map(b),c,!!d)};this.listen=function(a,c,d,f){this.addEventListener(a,c,function(c){b[d].call(b,c,a)},!!f)};this.delegate=function(a,c,d,f,e){this.addEventListener(a,d,function(d){h.matches(a,c,d.target)&&b[f].call(b,d,a)},!!e)};this.getParent=function(){return b};this.setParent=function(a){return a instanceof
Object?(b=a,true):false};this.map=function(a){return e?f[a]||a:a};this.setMap=function(a,b){return typeof a=="string"&&typeof b=="string"?(f[a]=b,true):false};this.setParent(c)}});
define("LocalStore",["Store","Tools"],function(h,c){function d(){var b=null,d=localStorage,e=function(){d.setItem(b,this.toJSON())};this.setLocalStorage=function(a){return a&&a.setItem instanceof Function?(d=a,true):false};this.getLocalStorage=function(){return d};this.sync=function(a){return typeof a=="string"?(b=a,a=JSON.parse(d.getItem(a)),c.loop(a,function(a,b){this.has(b)||this.set(b,a)},this),e.call(this),this.watch("added",e,this),this.watch("updated",e,this),this.watch("deleted",e,this),true):
false}}return function(b){d.prototype=new h(b);return new d}});
define("Plugins",["Tools","DomUtils"],function(h,c){return function(d){var b={},f=function(a){return a.trim()},e=function(a,c,d){c.split(";").forEach(function(c){var e=c.split(":"),c=e[0].trim(),e=e[1]?e[1].split(",").map(f):[];e.unshift(a);b[d]&&b[d][c]&&b[d][c].apply(b[d],e)})};this.add=function(a,c){var d=this;return typeof a=="string"&&typeof c=="object"&&c?(b[a]=c,c.plugins={name:a,apply:function(){return d.apply.apply(d,arguments)}},true):false};this.addAll=function(a){return h.loop(a,function(a,
b){this.add(b,a)},this)};this.get=function(a){return b[a]};this.del=function(a){return delete b[a]};this.apply=function(a){var b;return c.isAcceptedType(a)?(b=c.getNodes(a),h.loop(h.toArray(b),function(a){h.loop(c.getDataset(a),function(b,c){e(a,b,c)})}),a):false};this.addAll(d)}});
define("OObject",["StateMachine","Store","Plugins","DomUtils","Tools"],function(h,c,d,b,f){return function(e){var a=function(a){var c=k||document.createElement("div");if(a.template){typeof a.template=="string"?c.innerHTML=a.template.trim():b.isAcceptedType(a.template)&&c.appendChild(a.template);if(c.childNodes.length>1)throw Error("UI.template should have only one parent node");else a.dom=c.childNodes[0];a.plugins.apply(a.dom)}else throw Error("UI.template must be set prior to render");},j=function g(a,
g,b){g&&(b?g.insertBefore(a.dom,b):g.appendChild(a.dom),k=g)},k=null,l=new h("Init",{Init:[["render",a,this,"Rendered"],["place",function(b,c){a(b);j.apply(null,f.toArray(arguments))},this,"Rendered"]],Rendered:[["place",j,this],["render",a,this]]});this.model=e instanceof c?e:new c;this.plugins=new d;this.dom=this.template=null;this.place=function(a,b){l.event("place",this,a,b)};this.render=function(){l.event("render",this)};this.setTemplateFromDom=function(a){return b.isAcceptedType(a)?(this.template=
a,true):false};this.alive=function(a){return b.isAcceptedType(a)?(this.setTemplateFromDom(a),this.place(a.parentNode,a.nextElementSibling),true):false};this.getCurrentPlace=function(){return k}}});
define("Place.plugin",["OObject","Tools"],function(h,c){return function(d){var b={};this.place=function(c,d){if(b[d]instanceof h)b[d].place(c);else throw Error(d+" is not an OObject UI in place:"+d);};this.set=function(c,d){return typeof c=="string"&&d instanceof h?(b[c]=d,true):false};this.setAll=function(b){c.loop(b,function(b,a){this.set(a,b)},this)};this.get=function(c){return b[c]};this.setAll(d)}});
define("SocketIOTransport",["Observable","Tools"],function(){return function(h){var c=null;this.setSocket=function(d){return d&&typeof d.emit=="function"?(c=d,true):false};this.getSocket=function(){return c};this.on=function(d,b){return c.on(d,b)};this.once=function(d,b){return c.once(d,b)};this.emit=function(d,b,f){return c.emit(d,b,f)};this.removeListener=function(d,b,f){return c.removeListener(d,b,f)};this.request=function(c,b,f,e){return typeof c=="string"&&typeof b!="undefined"?(b={eventId:Date.now()+
Math.floor(Math.random()*1E6),data:b},this.once(b.eventId,function(){f&&f.apply(e||null,arguments)}),this.emit(c,b),true):false};this.listen=function(c,b,f,e){if(typeof c=="string"&&typeof b!="undefined"&&typeof f=="function"){var a={eventId:Date.now()+Math.floor(Math.random()*1E6),data:b,keepAlive:true},h=function(){f&&f.apply(e||null,arguments)},k=this;this.on(a.eventId,h);this.emit(c,a);return function(){k.emit("disconnect-"+a.eventId);k.removeListener(a.eventId,h)}}else return false};this.setSocket(h)}});
