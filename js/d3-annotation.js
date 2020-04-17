!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-selection"),require("d3-drag"),require("d3-shape"),require("d3-dispatch")):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-drag","d3-shape","d3-dispatch"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3)}(this,function(t,e,n,o,a){"use strict";function i(){var t=[],n=void 0,o=void 0,i=[],s={},r={},c=!1,d=void 0,u=H,h=void 0,l=void 0,f=a.dispatch("subjectover","subjectout","subjectclick","connectorover","connectorout","connectorclick","noteover","noteout","noteclick","dragend","dragstart"),v=void 0,g=function(o){v=o,c||o.selectAll("circle.handle").remove();var a=t.map(function(t){return t.type||(t.type=u),t.disable||(t.disable=i),new p(t)});n=n||new y({annotations:a,accessors:s,accessorsInverse:r,ids:d}),o.selectAll("g").data([n]).enter().append("g").attr("class","annotations");var g=o.select("g.annotations");Q(g,n.annotations,"g","annotation"),g.selectAll("g.annotation").each(function(t){var n=e.select(this);n.attr("class","annotation"),Q(n,[t],"g","annotation-connector"),Q(n,[t],"g","annotation-subject"),Q(n,[t],"g","annotation-note"),Q(n.select("g.annotation-note"),[t],"g","annotation-note-content"),t.type="[object Object]"===t.type.toString()?t.type:new t.type({a:n,annotation:t,textWrap:h,notePadding:l,editMode:c,dispatcher:f,accessors:s}),t.type.draw(),t.type.drawText&&t.type.drawText()})};return g.json=function(){return console.log("Annotations JSON was copied to your clipboard. Please note the annotation type is not JSON compatible. It appears in the objects array in the console, but not in the copied JSON.",n.json),window.copy(JSON.stringify(n.json.map(function(t){return delete t.type,t}))),g},g.update=function(){return t&&n&&(t=n.annotations.map(function(t){return t.type.draw(),t})),g},g.updateText=function(){return n&&(n.updateText(h),t=n.annotations),g},g.updatedAccessors=function(){return n.setPositionWithAccessors(),t=n.annotations,g},g.disable=function(e){return arguments.length?(i=e,n&&(n.updateDisable(i),t=n.annotations),g):i},g.textWrap=function(e){return arguments.length?(h=e,n&&(n.updateTextWrap(h),t=n.annotations),g):h},g.notePadding=function(e){return arguments.length?(l=e,n&&(n.updateNotePadding(l),t=n.annotations),g):l},g.type=function(e,o){return arguments.length?(u=e,n&&(n.annotations.map(function(t){t.type.note&&t.type.note.selectAll("*:not(.annotation-note-content)").remove(),t.type.noteContent&&t.type.noteContent.selectAll("*").remove(),t.type.subject&&t.type.subject.selectAll("*").remove(),t.type.connector&&t.type.connector.selectAll("*").remove(),t.type.typeSettings={},t.type=u,t.subject=o&&o.subject||t.subject,t.connector=o&&o.connector||t.connector,t.note=o&&o.note||t.note}),t=n.annotations),g):u},g.annotations=function(e){if(!arguments.length)return n&&n.annotations||t;if(t=e,n&&n.annotations){t.some(function(t){return!t.type||"[object Object]"!==t.type.toString()})?(n=null,g(v)):n.annotations=t}return g},g.context=function(t){return arguments.length?(o=t,g):o},g.accessors=function(t){return arguments.length?(s=t,g):s},g.accessorsInverse=function(t){return arguments.length?(r=t,g):r},g.ids=function(t){return arguments.length?(d=t,g):d},g.editMode=function(e){return arguments.length?(c=e,v&&v.selectAll("g.annotation").classed("editable",c),n&&(n.editMode(c),t=n.annotations),g):c},g.collection=function(t){return arguments.length?(n=t,g):n},g.on=function(){var t=f.on.apply(f,arguments);return t===f?g:t},g}var s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},d=function t(e,n,o){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,o)}if("value"in a)return a.value;var s=a.get;if(void 0!==s)return s.call(o)},u=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},h=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},l=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)},p=function(){function t(e){var n=e.x,o=void 0===n?0:n,a=e.y,i=void 0===a?0:a,r=e.nx,c=e.ny,d=e.dy,u=void 0===d?0:d,h=e.dx,l=void 0===h?0:h,p=e.color,y=void 0===p?"grey":p,f=e.data,v=e.type,g=e.subject,x=e.connector,b=e.note,m=e.disable,j=e.id,w=e.className;s(this,t),this._dx=void 0!==r?r-o:l,this._dy=void 0!==c?c-i:u,this._x=o,this._y=i,this._color=y,this.id=j,this._className=w||"",this.type=v||"",this.data=f,this.note=b||{},this.connector=x||{},this.subject=g||{},this.disable=m||[]}return r(t,[{key:"updatePosition",value:function(){this.type.setPosition&&(this.type.setPosition(),0!==this.type.subject.selectAll(":not(.handle)").nodes().length&&this.type.redrawSubject())}},{key:"updateOffset",value:function(){this.type.setOffset&&(this.type.setOffset(),0!==this.type.connector.selectAll(":not(.handle)").nodes().length&&this.type.redrawConnector(),this.type.redrawNote())}},{key:"className",get:function(){return this._className},set:function(t){this._className=t,this.type.setClassName&&this.type.setClassName()}},{key:"x",get:function(){return this._x},set:function(t){this._x=t,this.updatePosition()}},{key:"y",get:function(){return this._y},set:function(t){this._y=t,this.updatePosition()}},{key:"color",get:function(){return this._color},set:function(t){this._color=t,this.updatePosition()}},{key:"dx",get:function(){return this._dx},set:function(t){this._dx=t,this.updateOffset()}},{key:"dy",get:function(){return this._dy},set:function(t){this._dy=t,this.updateOffset()}},{key:"nx",set:function(t){this._dx=t-this._x,this.updateOffset()}},{key:"ny",set:function(t){this._dy=t-this._y,this.updateOffset()}},{key:"offset",get:function(){return{x:this._dx,y:this._dy}},set:function(t){var e=t.x,n=t.y;this._dx=e,this._dy=n,this.updateOffset()}},{key:"position",get:function(){return{x:this._x,y:this._y}},set:function(t){var e=t.x,n=t.y;this._x=e,this._y=n,this.updatePosition()}},{key:"translation",get:function(){return{x:this._x+this._dx,y:this._y+this._dy}}},{key:"json",get:function(){var t={x:this._x,y:this._y,dx:this._dx,dy:this._dy};return this.data&&Object.keys(this.data).length>0&&(t.data=this.data),this.type&&(t.type=this.type),this._className&&(t.className=this._className),Object.keys(this.connector).length>0&&(t.connector=this.connector),Object.keys(this.subject).length>0&&(t.subject=this.subject),Object.keys(this.note).length>0&&(t.note=this.note),t}}]),t}(),y=function(){function t(e){var n=e.annotations,o=e.accessors,a=e.accessorsInverse;s(this,t),this.accessors=o,this.accessorsInverse=a,this.annotations=n}return r(t,[{key:"clearTypes",value:function(t){this.annotations.forEach(function(e){e.type=void 0,e.subject=t&&t.subject||e.subject,e.connector=t&&t.connector||e.connector,e.note=t&&t.note||e.note})}},{key:"setPositionWithAccessors",value:function(){var t=this;this.annotations.forEach(function(e){e.type.setPositionWithAccessors(t.accessors)})}},{key:"editMode",value:function(t){this.annotations.forEach(function(e){e.type&&(e.type.editMode=t,e.type.updateEditMode())})}},{key:"updateDisable",value:function(t){this.annotations.forEach(function(e){e.disable=t,e.type&&t.forEach(function(t){e.type[t]&&(e.type[t].remove&&e.type[t].remove(),e.type[t]=void 0)})})}},{key:"updateTextWrap",value:function(t){this.annotations.forEach(function(e){e.type&&e.type.updateTextWrap&&e.type.updateTextWrap(t)})}},{key:"updateText",value:function(){this.annotations.forEach(function(t){t.type&&t.type.drawText&&t.type.drawText()})}},{key:"updateNotePadding",value:function(t){this.annotations.forEach(function(e){e.type&&(e.type.notePadding=t)})}},{key:"json",get:function(){var t=this;return this.annotations.map(function(e){var n=e.json;return t.accessorsInverse&&e.data&&(n.data={},Object.keys(t.accessorsInverse).forEach(function(o){n.data[o]=t.accessorsInverse[o]({x:e.x,y:e.y})})),n})}},{key:"noteNodes",get:function(){return this.annotations.map(function(t){return c({},t.type.getNoteBBoxOffset(),{positionX:t.x,positionY:t.y})})}}]),t}(),f=function(t){var e=t.cx,n=void 0===e?0:e,o=t.cy;return{move:{x:n,y:void 0===o?0:o}}},v=function(t){var e=t.cx,n=void 0===e?0:e,o=t.cy,a=void 0===o?0:o,i=t.r1,s=t.r2,r=t.padding,c={move:{x:n,y:a}};return void 0!==i&&(c.r1={x:n+i/Math.sqrt(2),y:a+i/Math.sqrt(2)}),void 0!==s&&(c.r2={x:n+s/Math.sqrt(2),y:a+s/Math.sqrt(2)}),void 0!==r&&(c.padding={x:n+i+r,y:a}),c},g=function(t){var o=t.group,a=t.handles,i=t.r,s=void 0===i?10:i,r=o.selectAll("circle.handle").data(a);r.enter().append("circle").attr("class","handle").attr("fill","grey").attr("fill-opacity",.1).attr("cursor","move").attr("stroke-dasharray",5).attr("stroke","grey").call(n.drag().container(e.select("g.annotations").node()).on("start",function(t){return t.start&&t.start(t)}).on("drag",function(t){return t.drag&&t.drag(t)}).on("end",function(t){return t.end&&t.end(t)})),o.selectAll("circle.handle").attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y}).attr("r",function(t){return t.r||s}).attr("class",function(t){return"handle "+(t.className||"")}),r.exit().remove()},x=function(t,e){return"dynamic"!==t&&"left"!==t&&"right"!==t||(t=e<0?"top":"bottom"),t},b=function(t,e){return"dynamic"!==t&&"top"!==t&&"bottom"!==t||(t=e<0?"right":"left"),t},m=["topBottom","top","bottom"],j=["leftRight","left","right"],w=function(t){var e=t.padding,n=void 0===e?0:e,o=t.bbox,a=void 0===o?{x:0,y:0,width:0,height:0}:o,i=t.align,s=t.orientation,r=t.offset,c=void 0===r?{x:0,y:0}:r,d=-a.x,u=0;return m.indexOf(s)!==-1?(i=b(i,c.x),c.y<0&&"topBottom"===s||"top"===s?u-=a.height+n:u+=n,"middle"===i?d-=a.width/2:"right"===i&&(d-=a.width)):j.indexOf(s)!==-1&&(i=x(i,c.y),c.x<0&&"leftRight"===s||"left"===s?d-=a.width+n:d+=n,"middle"===i?u-=a.height/2:"top"===i&&(u-=a.height)),{x:d,y:u}},_=function(t){var e=t.data,n=t.curve,a=void 0===n?o.curveLinear:n,i=t.canvasContext,s=t.className,r=t.classID,c=o.line().curve(a),d={type:"path",className:s,classID:r,data:e};return i?(c.context(i),d.pathMethods=c):d.attrs={d:c(e)},d},k=function(t){var e=t.data,n=t.canvasContext,a=t.className,i=t.classID,s={type:"path",className:a,classID:i,data:e},r=o.arc().innerRadius(e.innerRadius||0).outerRadius(e.outerRadius||e.radius||2).startAngle(e.startAngle||0).endAngle(e.endAngle||2*Math.PI);return n?(r.context(n),s.pathMethods=lineGen):s.attrs={d:r()},s},O=function(t){var e=t.align,n=t.x,o=void 0===n?0:n,a=t.y,i=void 0===a?0:a,s=t.bbox;return e=x(e,t.offset.y),"top"===e?i-=s.height:"middle"===e&&(i-=s.height/2),{components:[_({data:[[o,i],[o,i+s.height]],className:"note-line"})]}},M=function(t){var e=t.align,n=t.x,o=void 0===n?0:n,a=t.y,i=void 0===a?0:a,s=t.offset,r=t.bbox;return e=b(e,s.x),"right"===e?o-=r.width:"middle"===e&&(o-=r.width/2),{components:[_({data:[[o,i],[o+r.width,i]],className:"note-line"})]}},N=function(t){var e=t.type,n=t.subjectType,o=e.annotation,a=o.position,i=o.x-a.x,s=i+o.dx,r=o.y-a.y,c=r+o.dy,d=o.subject;if("circle"===n&&(d.outerRadius||d.radius)){var u=Math.sqrt((i-s)*(i-s)+(r-c)*(r-c)),h=Math.asin(-c/u),l=d.outerRadius||d.radius+(d.radiusPadding||0);i=Math.abs(Math.cos(h)*l)*(s<0?-1:1),r=Math.abs(Math.sin(h)*l)*(c<0?-1:1)}if("rect"===n){var p=d.width,y=d.height;(p>0&&o.dx>0||p<0&&o.dx<0)&&(i=Math.abs(p)>Math.abs(o.dx)?p/2:p),(y>0&&o.dy>0||y<0&&o.dy<0)&&(r=Math.abs(y)>Math.abs(o.dy)?y/2:y),i===p/2&&r===y/2&&(i=s,r=c)}return[[i,r],[s,c]]},C=function(t){return{components:[_({data:N(t),className:"connector"})]}},S=function(t){var e=t.type,n=t.subjectType,o=e.annotation,a=o.position,i=o.x-a.x,s=i+o.dx,r=o.y-a.y,c=r+o.dy,d=o.subject;if("rect"===n){var u=d.width,h=d.height;(u>0&&o.dx>0||u<0&&o.dx<0)&&(i=Math.abs(u)>Math.abs(o.dx)?u/2:u),(h>0&&o.dy>0||h<0&&o.dy<0)&&(r=Math.abs(h)>Math.abs(o.dy)?h/2:h),i===u/2&&r===h/2&&(i=s,r=c)}var l=[[i,r],[s,c]],p=c-r,y=s-i,f=s,v=c,g=c<r&&s>i||s<i&&c>r?-1:1;if(Math.abs(y)<Math.abs(p)?(f=s,v=r+y*g):(v=c,f=i+p*g),"circle"===n&&(d.outerRadius||d.radius)){var x=(d.outerRadius||d.radius)+(d.radiusPadding||0),b=x/Math.sqrt(2);if(Math.abs(y)>b&&Math.abs(p)>b)i=b*(s<0?-1:1),r=b*(c<0?-1:1),l=[[i,r],[f,v],[s,c]];else if(Math.abs(y)>Math.abs(p)){var m=Math.asin(-c/x);i=Math.abs(Math.cos(m)*x)*(s<0?-1:1),l=[[i,c],[s,c]]}else{var j=Math.acos(s/x);r=Math.abs(Math.sin(j)*x)*(c<0?-1:1),l=[[s,r],[s,c]]}}else l=[[i,r],[f,v],[s,c]];return{components:[_({data:l,className:"connector"})]}},P=function(t){var n=t.type,a=t.connectorData,i=t.subjectType;a||(a={}),a.points&&"number"!=typeof a.points||(a.points=T(n.annotation.offset,a.points)),a.curve||(a.curve=o.curveCatmullRom);var s=[];if(n.editMode){var r=a.points.map(function(t,e){return c({},f({cx:t[0],cy:t[1]}),{index:e})}),d=function(t){a.points[t][0]+=e.event.dx,a.points[t][1]+=e.event.dy,n.redrawConnector()};s=n.mapHandles(r.map(function(t){return c({},t.move,{drag:d.bind(n,t.index)})}))}var u=N({type:n,subjectType:i});return u=[u[0]].concat(l(a.points),[u[1]]),{components:[_({data:u,curve:a.curve,className:"connector"})],handles:s}},T=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n={x:t.x/(e+1),y:t.y/(e+1)},o=[],a=1;a<=e;a++)o.push([n.x*a+a%2*20,n.y*a-a%2*20]);return o},A=function(t){var e=t.annotation,n=t.start,o=t.end,a=t.scale,i=void 0===a?1:a,s=e.position;n=n?[-o[0]+n[0],-o[1]+n[1]]:[e.dx,e.dy],o||(o=[e.x-s.x,e.y-s.y]);var r=o[0],c=o[1],d=n[0],u=n[1],h=10*i,l=16/180*Math.PI,p=Math.atan(u/d);return d<0&&(p+=Math.PI),{components:[_({data:[[r,c],[Math.cos(p+l)*h+r,Math.sin(p+l)*h+c],[Math.cos(p-l)*h+r,Math.sin(p-l)*h+c],[r,c]],className:"connector-end connector-arrow",classID:"connector-end"})]}},E=function(t){var e=t.line,n=t.scale,o=void 0===n?1:n,a=k({className:"connector-end connector-dot",classID:"connector-end",data:{radius:3*Math.sqrt(o)}});return a.attrs.transform="translate("+e.data[0][0]+", "+e.data[0][1]+")",{components:[a]}},R=function(t){var n=t.subjectData,o=t.type;n.radius||n.outerRadius||(n.radius=20);var a=[],i=k({data:n,className:"subject"});if(o.editMode){var s=v({r1:i.data.outerRadius||i.data.radius,r2:i.data.innerRadius,padding:n.radiusPadding}),r=function(t){var a=n[t]+e.event.dx*Math.sqrt(2);n[t]=a,o.redrawSubject(),o.redrawConnector()},d=[c({},s.r1,{drag:r.bind(o,void 0!==n.outerRadius?"outerRadius":"radius")})];n.innerRadius&&d.push(c({},s.r2,{drag:r.bind(o,"innerRadius")})),a=o.mapHandles(d)}return i.attrs["fill-opacity"]=0,{components:[i],handles:a}},B=function(t){var n=t.subjectData,o=t.type;n.width||(n.width=100),n.height||(n.height=100);var a=[],i=n.width,s=n.height,r=[[0,0],[i,0],[i,s],[0,s],[0,0]],c=_({data:r,className:"subject"});if(o.editMode){var d=function(){n.width=e.event.x,o.redrawSubject(),o.redrawConnector()},u=function(){n.height=e.event.y,o.redrawSubject(),o.redrawConnector()},h=[{x:i,y:s/2,drag:d.bind(o)},{x:i/2,y:s,drag:u.bind(o)}];a=o.mapHandles(h)}return c.attrs["fill-opacity"]=.1,{components:[c],handles:a}},I=function(t){var e=t.subjectData,n=t.type,o=n.annotation.position,a=(void 0!==e.x1?e.x1:o.x)-o.x,i=(void 0!==e.x2?e.x2:o.x)-o.x;return{components:[_({data:[[a,(void 0!==e.y1?e.y1:o.y)-o.y],[i,(void 0!==e.y2?e.y2:o.y)-o.y]],className:"subject"})]}},q=function(t){var n=t.subjectData,o=void 0===n?{}:n,a=t.type,i=void 0===a?{}:a,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.typeSettings&&i.typeSettings.subject;o.radius||(r&&r.radius?o.radius=r.radius:o.radius=14),o.x||r&&r.x&&(o.x=r.x),o.y||r&&r.y&&(o.y=r.y);var c=[],d=[],u=o.radius,h=.7*u,l=0,p=0,y=Math.sqrt(2)*u,f={xleftcorner:-u,xrightcorner:u,ytopcorner:-u,ybottomcorner:u,xleft:-y,xright:y,ytop:-y,ybottom:y};o.x&&!o.y?l=f["x"+o.x]:o.y&&!o.x?p=f["y"+o.y]:o.x&&o.y&&(l=f["x"+o.x+"corner"],p=f["y"+o.y+"corner"]);var v="translate("+l+", "+p+")",g=k({className:"subject",data:{radius:u}});g.attrs.transform=v,g.attrs.fill=s.color,g.attrs["stroke-linecap"]="round",g.attrs["stroke-width"]="3px";var x=k({className:"subject-ring",data:{outerRadius:u,innerRadius:h}});x.attrs.transform=v,x.attrs["stroke-width"]="3px",x.attrs.fill="white";var b=void 0;if(l&&p||!l&&!p)b=_({className:"subject-pointer",data:[[0,0],[l||0,0],[0,p||0],[0,0]]});else if(l||p){var m=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return t&&t/Math.sqrt(2)/Math.sqrt(2)||e*u/Math.sqrt(2)};b=_({className:"subject-pointer",data:[[0,0],[m(l),m(p)],[m(l,-1),m(p,-1)],[0,0]]})}if(b&&(b.attrs.fill=s.color,b.attrs["stroke-linecap"]="round",b.attrs["stroke-width"]="3px",d.push(b)),i.editMode){var j=function(){o.x=e.event.x<2*-u?"left":e.event.x>2*u?"right":void 0,o.y=e.event.y<2*-u?"top":e.event.y>2*u?"bottom":void 0,i.redrawSubject()},w={x:2*l,y:2*p,drag:j.bind(i)};w.x||w.y||(w.y=-u),c=i.mapHandles([w])}var O=void 0;return o.text&&(O={type:"text",className:"badge-text",attrs:{fill:"white",stroke:"none","font-size":".7em",text:o.text,"text-anchor":"middle",dy:".25em",x:l,y:p}}),d.push(g),d.push(x),d.push(O),{components:d,handles:c}},D=function(){function t(e){var n=e.a,o=e.annotation,a=e.editMode,i=e.dispatcher,r=e.notePadding,c=e.accessors;if(s(this,t),this.a=n,this.note=o.disable.indexOf("note")===-1&&n.select("g.annotation-note"),this.noteContent=this.note&&n.select("g.annotation-note-content"),this.connector=o.disable.indexOf("connector")===-1&&n.select("g.annotation-connector"),this.subject=o.disable.indexOf("subject")===-1&&n.select("g.annotation-subject"),this.dispatcher=i,i){var d=U.bind(null,i,o);d({component:this.note,name:"note"}),d({component:this.connector,name:"connector"}),d({component:this.subject,name:"subject"})}this.annotation=o,this.editMode=o.editMode||a,this.notePadding=void 0!==r?r:3,this.offsetCornerX=0,this.offsetCornerY=0,c&&o.data&&this.init(c)}return r(t,[{key:"init",value:function(t){this.annotation.x||this.mapX(t),this.annotation.y||this.mapY(t)}},{key:"mapY",value:function(t){t.y&&(this.annotation.y=t.y(this.annotation.data))}},{key:"mapX",value:function(t){t.x&&(this.annotation.x=t.x(this.annotation.data))}},{key:"updateEditMode",value:function(){this.a.selectAll("circle.handle").remove()}},{key:"drawOnSVG",value:function(t,e){var n=this;Array.isArray(e)||(e=[e]),e.filter(function(t){return t}).forEach(function(e){var o=e.type,a=e.className,i=e.attrs,s=e.handles,r=e.classID;if("handle"===o)g({group:t,r:i&&i.r,handles:s});else{Q(t,[n.annotation],o,a,r);for(var c=t.select(o+"."+(r||a)),d=Object.keys(i),u=[],h=c.node().attributes,l=h.length-1;l>=0;l--){var p=h[l].name;d.indexOf(p)===-1&&"class"!==p&&u.push(p)}d.forEach(function(t){"text"===t?c.text(i[t]):c.attr(t,i[t])}),u.forEach(function(t){return c.attr(t,null)})}})}},{key:"getNoteBBox",value:function(){return $(this.note,".annotation-note-content text")}},{key:"getNoteBBoxOffset",value:function(){var t=$(this.note,".annotation-note-content"),e=this.noteContent.attr("transform").split(/\(|\,|\)/g);return t.offsetCornerX=parseFloat(e[1])+this.annotation.dx,t.offsetCornerY=parseFloat(e[2])+this.annotation.dy,t.offsetX=this.annotation.dx,t.offsetY=this.annotation.dy,t}},{key:"drawSubject",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.annotation.subject,o=e.type,a={type:this,subjectData:n},i={};"circle"===o?i=R(a):"rect"===o?i=B(a):"threshold"===o?i=I(a):"badge"===o&&(i=q(a,this.annotation));var s=i,r=s.components,c=void 0===r?[]:r,d=s.handles,u=void 0===d?[]:d;return c.forEach(function(e){e&&e.attrs&&!e.attrs.stroke&&(e.attrs.stroke=t.annotation.color)}),this.editMode&&(u=u.concat(this.mapHandles([{drag:this.dragSubject.bind(this)}])),c.push({type:"handle",handles:u})),c}},{key:"drawConnector",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.annotation.connector,o=n.type||e.type,a={type:this,connectorData:n};a.subjectType=this.typeSettings&&this.typeSettings.subject&&this.typeSettings.subject.type;var i={};i="curve"===o?P(a):"elbow"===o?S(a):C(a);var s=i,r=s.components,c=void 0===r?[]:r,d=s.handles,u=void 0===d?[]:d,h=c[0];h&&(h.attrs.stroke=this.annotation.color,h.attrs.fill="none");var l=n.end||e.end,p={};if("arrow"===l){var y=h.data[1],f=h.data[0];Math.sqrt(Math.pow(y[0]-f[0],2)+Math.pow(y[1]-f[1],2))<5&&h.data[2]&&(y=h.data[2]),p=A({annotation:this.annotation,start:y,end:f,scale:n.endScale})}else"dot"===l&&(p=E({line:h,scale:n.endScale}));return p.components&&(p.components.forEach(function(e){e.attrs.fill=t.annotation.color,e.attrs.stroke=t.annotation.color}),c=c.concat(p.components)),this.editMode&&0!==u.length&&c.push({type:"handle",handles:u}),c}},{key:"drawNote",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.annotation.note,o=n.align||e.align||"dynamic",a={bbox:e.bbox,align:o,offset:this.annotation.offset},i=n.lineType||e.lineType,s={};"vertical"===i?s=O(a):"horizontal"===i&&(s=M(a));var r=s,c=r.components,d=void 0===c?[]:c,u=r.handles,h=void 0===u?[]:u;return d.forEach(function(e){e.attrs.stroke=t.annotation.color}),this.editMode&&(h=this.mapHandles([{x:0,y:0,drag:this.dragNote.bind(this)}]),d.push({type:"handle",handles:h})),d}},{key:"drawNoteContent",value:function(t){var e=this.annotation.note,n=void 0!==e.padding?e.padding:this.notePadding,o=e.orientation||t.orientation||"topBottom",a=e.lineType||t.lineType,i=e.align||t.align||"dynamic";"vertical"===a?o="leftRight":"horizontal"===a&&(o="topBottom");var s={padding:n,bbox:t.bbox,offset:this.annotation.offset,orientation:o,align:i},r=w(s),c=r.x,d=r.y;return this.offsetCornerX=c+this.annotation.dx,this.offsetCornerY=d+this.annotation.dy,this.note&&this.noteContent.attr("transform","translate("+c+", "+d+")"),[]}},{key:"drawOnScreen",value:function(t,e){return this.drawOnSVG(t,e)}},{key:"redrawSubject",value:function(){this.subject&&this.drawOnScreen(this.subject,this.drawSubject())}},{key:"redrawConnector",value:function(){this.connector&&this.drawOnScreen(this.connector,this.drawConnector())}},{key:"redrawNote",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.getNoteBBox();this.noteContent&&this.drawOnScreen(this.noteContent,this.drawNoteContent({bbox:t})),this.note&&this.drawOnScreen(this.note,this.drawNote({bbox:t}))}},{key:"setPosition",value:function(){var t=this.annotation.position;this.a.attr("transform","translate("+t.x+", "+t.y+")")}},{key:"setOffset",value:function(){if(this.note){var t=this.annotation.offset;this.note.attr("transform","translate("+t.x+", "+t.y+")")}}},{key:"setPositionWithAccessors",value:function(t){t&&this.annotation.data&&(this.mapX(t),this.mapY(t)),this.setPosition()}},{key:"setClassName",value:function(){this.a.attr("class","annotation "+(this.className&&this.className())+" "+(this.editMode?"editable":"")+" "+(this.annotation.className||""))}},{key:"draw",value:function(){this.setClassName(),this.setPosition(),this.setOffset(),this.redrawSubject(),this.redrawConnector(),this.redrawNote()}},{key:"dragstarted",value:function(){e.event.sourceEvent.stopPropagation(),this.dispatcher&&this.dispatcher.call("dragstart",this.a,this.annotation),this.a.classed("dragging",!0),this.a.selectAll("circle.handle").style("pointer-events","none")}},{key:"dragended",value:function(){this.dispatcher&&this.dispatcher.call("dragend",this.a,this.annotation),this.a.classed("dragging",!1),this.a.selectAll("circle.handle").style("pointer-events","all")}},{key:"dragSubject",value:function(){var t=this.annotation.position;t.x+=e.event.dx,t.y+=e.event.dy,this.annotation.position=t}},{key:"dragNote",value:function(){var t=this.annotation.offset;t.x+=e.event.dx,t.y+=e.event.dy,this.annotation.offset=t}},{key:"mapHandles",value:function(t){var e=this;return t.map(function(t){return c({},t,{start:e.dragstarted.bind(e),end:e.dragended.bind(e)})})}}]),t}(),W=function(t,e,n){return function(t){function o(t){s(this,o);var n=h(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,t));return n.typeSettings=e,e.disable&&e.disable.forEach(function(t){n[t]=void 0,"note"===t&&(n.noteContent=void 0)}),n}return u(o,t),r(o,[{key:"className",value:function(){return""+(e.className||d(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"className",this)&&d(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"className",this).call(this)||"")}},{key:"drawSubject",value:function(t){return this.typeSettings.subject=c({},e.subject,this.typeSettings.subject),d(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"drawSubject",this).call(this,c({},t,this.typeSettings.subject))}},{key:"drawConnector",value:function(t){return this.typeSettings.connector=c({},e.connector,this.typeSettings.connector),d(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"drawConnector",this).call(this,c({},t,e.connector,this.typeSettings.connector))}},{key:"drawNote",value:function(t){return this.typeSettings.note=c({},e.note,this.typeSettings.note),d(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"drawNote",this).call(this,c({},t,e.note,this.typeSettings.note))}},{key:"drawNoteContent",value:function(t){return d(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"drawNoteContent",this).call(this,c({},t,e.note,this.typeSettings.note))}}],[{key:"init",value:function(t,e){return d(o.__proto__||Object.getPrototypeOf(o),"init",this).call(this,t,e),n&&(t=n(t,e)),t}}]),o}(t)},X=function(t){function e(t){s(this,e);var n=h(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.textWrap=t.textWrap||120,n.drawText(),n}return u(e,t),r(e,[{key:"updateTextWrap",value:function(t){this.textWrap=t,this.drawText()}},{key:"drawText",value:function(){if(this.note){Q(this.note,[this.annotation],"g","annotation-note-content");var t=this.note.select("g.annotation-note-content");Q(t,[this.annotation],"rect","annotation-note-bg"),Q(t,[this.annotation],"text","annotation-note-label"),Q(t,[this.annotation],"text","annotation-note-title");var e={height:0},n=this.a.select("text.annotation-note-label"),o=this.annotation.note&&this.annotation.note.wrap||this.typeSettings&&this.typeSettings.note&&this.typeSettings.note.wrap||this.textWrap,a=this.annotation.note&&this.annotation.note.wrapSplitter||this.typeSettings&&this.typeSettings.note&&this.typeSettings.note.wrapSplitter;if(this.annotation.note.title){var i=this.a.select("text.annotation-note-title");i.text(this.annotation.note.title),i.attr("fill",this.annotation.color),i.attr("font-weight","bold"),i.call(Z,o,a),e=i.node().getBBox()}n.text(this.annotation.note.label).attr("dx","0"),n.call(Z,o,a),n.attr("y",1.1*e.height||0),n.attr("fill",this.annotation.color);var s=this.getNoteBBox();this.a.select("rect.annotation-note-bg").attr("width",s.width).attr("height",s.height).attr("x",s.x).attr("fill","white").attr("fill-opacity",0)}}}]),e}(D),Y=W(X,{className:"label",note:{align:"middle"}}),H=W(X,{className:"callout",note:{lineType:"horizontal"}}),z=W(H,{className:"callout elbow",connector:{type:"elbow"}}),F=W(H,{className:"callout curve",connector:{type:"curve"}}),J=W(D,{className:"badge",subject:{type:"badge"},disable:["connector","note"]}),L=W(z,{className:"callout circle",subject:{type:"circle"}}),G=W(z,{className:"callout rect",subject:{type:"rect"}}),V=function(t){function e(){return s(this,e),h(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,t),r(e,[{key:"mapY",value:function(t){d(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"mapY",this).call(this,t);var n=this.annotation;(n.subject.x1||n.subject.x2)&&n.data&&t.y&&(n.y=t.y(n.data)),!n.subject.x1&&!n.subject.x2||n.x||(n.x=n.subject.x1||n.subject.x2)}},{key:"mapX",value:function(t){d(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"mapX",this).call(this,t);var n=this.annotation;(n.subject.y1||n.subject.y2)&&n.data&&t.x&&(n.x=t.x(n.data)),!n.subject.y1&&!n.subject.y2||n.y||(n.y=n.subject.y1||n.subject.y2)}}]),e}(H),K=W(V,{className:"callout xythreshold",subject:{type:"threshold"}}),Q=function(t,e,n,o,a){var i=t.selectAll(n+"."+(a||o)).data(e);return i.enter().append(n).merge(i).attr("class",o),i.exit().remove(),t},U=function(t,e,n){var o=n.component,a=n.name;o&&o.on("mouseover.annotations",function(){t.call(a+"over",o,e)}).on("mouseout.annotations",function(){return t.call(a+"out",o,e)}).on("click.annotations",function(){return t.call(a+"click",o,e)})},Z=function(t,n,o){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1.2;t.each(function(){for(var t=e.select(this),i=t.text().split(o||/[ \t\r\n]+/).reverse().filter(function(t){return""!==t}),s=void 0,r=[],c=t.text(null).append("tspan").attr("x",0).attr("dy","0.8em");s=i.pop();)r.push(s),c.text(r.join(" ")),c.node().getComputedTextLength()>n&&r.length>1&&(r.pop(),c.text(r.join(" ")),r=[s],c=t.append("tspan").attr("x",0).attr("dy",a+"em").text(s))})},$=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:":not(.handle)";return t?t.selectAll(e).nodes().reduce(function(t,e){var n=e.getBBox();t.x=Math.min(t.x,n.x),t.y=Math.min(t.y,n.y),t.width=Math.max(t.width,n.width);var o=e&&e.attributes&&e.attributes.y;return t.height=Math.max(t.height,(o&&parseFloat(o.value)||0)+n.height),t},{x:0,y:0,width:0,height:0}):{x:0,y:0,width:0,height:0}},tt={annotation:i,annotationTypeBase:D,annotationLabel:Y,annotationCallout:H,annotationCalloutCurve:F,annotationCalloutElbow:z,annotationCalloutCircle:L,annotationCalloutRect:G,annotationXYThreshold:K,annotationBadge:J,annotationCustomType:W};t.annotation=i,t.annotationTypeBase=D,t.annotationLabel=Y,t.annotationCallout=H,t.annotationCalloutCurve=F,t.annotationCalloutElbow=z,t.annotationCalloutCircle=L,t.annotationCalloutRect=G,t.annotationXYThreshold=K,t.annotationBadge=J,t.annotationCustomType=W,t.default=tt,Object.defineProperty(t,"__esModule",{value:!0})});