/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com 
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */
function launchParticlesJS(d,c){pJS={canvas:{el:document.querySelector("#"+d+" > canvas"),w:document.querySelector("#"+d+" > canvas").offsetWidth,h:document.querySelector("#"+d+" > canvas").offsetHeight},particles:{color:"#fff",shape:"circle",opacity:1,size:2.5,size_random:true,nb:200,line_linked:{enable_auto:true,distance:100,color:"#fff",opacity:1,width:1,condensed_mode:{enable:true,rotateX:65000,rotateY:65000}},anim:{enable:true,speed:1},array:[]},interactivity:{enable:true,mouse:{distance:100},detect_on:"canvas",mode:"grab"},retina_detect:false,fn:{vendors:{interactivity:{}}}};
if(c){if(c.particles){if(c.particles.color){pJS.particles.color=c.particles.color;}if(c.particles.shape){pJS.particles.shape=c.particles.shape;}if(c.particles.opacity){pJS.particles.opacity=c.particles.opacity;
}if(c.particles.size){pJS.particles.size=c.particles.size;}if(c.particles.size_random==false){pJS.particles.size_random=c.particles.size_random;}if(c.particles.nb){pJS.particles.nb=c.particles.nb;
}if(c.particles.line_linked){if(c.particles.line_linked.enable_auto==false){pJS.particles.line_linked.enable_auto=c.particles.line_linked.enable_auto;}if(c.particles.line_linked.distance){pJS.particles.line_linked.distance=c.particles.line_linked.distance;
}if(c.particles.line_linked.color){pJS.particles.line_linked.color=c.particles.line_linked.color;}if(c.particles.line_linked.opacity){pJS.particles.line_linked.opacity=c.particles.line_linked.opacity;
}if(c.particles.line_linked.width){pJS.particles.line_linked.width=c.particles.line_linked.width;}if(c.particles.line_linked.condensed_mode){if(c.particles.line_linked.condensed_mode.enable==false){pJS.particles.line_linked.condensed_mode.enable=c.particles.line_linked.condensed_mode.enable;
}if(c.particles.line_linked.condensed_mode.rotateX){pJS.particles.line_linked.condensed_mode.rotateX=c.particles.line_linked.condensed_mode.rotateX;}if(c.particles.line_linked.condensed_mode.rotateY){pJS.particles.line_linked.condensed_mode.rotateY=c.particles.line_linked.condensed_mode.rotateY;
}}}if(c.particles.anim){if(c.particles.anim.enable==false){pJS.particles.anim.enable=c.particles.anim.enable;}if(c.particles.anim.speed){pJS.particles.anim.speed=c.particles.anim.speed;
}}}if(c.interactivity){if(c.interactivity.enable==false){pJS.interactivity.enable=c.interactivity.enable;}if(c.interactivity.mouse){if(c.interactivity.mouse.distance){pJS.interactivity.mouse.distance=c.interactivity.mouse.distance;
}}if(c.interactivity.mode){pJS.interactivity.mode=c.interactivity.mode;}if(c.interactivity.detect_on){pJS.interactivity.detect_on=c.interactivity.detect_on;
}}pJS.retina_detect=c.retina_detect;}pJS.particles.color_rgb=hexToRgb(pJS.particles.color);pJS.particles.line_linked.color_rgb_line=hexToRgb(pJS.particles.line_linked.color);
if(pJS.retina_detect){if(window.devicePixelRatio>1){pJS.retina=true;pJS.canvas.w=pJS.canvas.el.offsetWidth*2;pJS.canvas.h=pJS.canvas.el.offsetHeight*2;
pJS.particles.anim.speed=pJS.particles.anim.speed*2;pJS.particles.line_linked.distance=pJS.particles.line_linked.distance*2;pJS.particles.line_linked.width=pJS.particles.line_linked.width*2;
pJS.interactivity.mouse.distance=pJS.interactivity.mouse.distance*2;}}pJS.fn.canvasInit=function(){pJS.canvas.ctx=pJS.canvas.el.getContext("2d");};pJS.fn.canvasSize=function(){pJS.canvas.el.width=pJS.canvas.w;
pJS.canvas.el.height=pJS.canvas.h;window.onresize=function(){if(pJS.retina){pJS.canvas.w=pJS.canvas.el.offsetWidth*2;pJS.canvas.h=pJS.canvas.el.offsetHeight*2;
}else{pJS.canvas.w=pJS.canvas.el.offsetWidth;pJS.canvas.h=pJS.canvas.el.offsetHeight;}pJS.canvas.el.width=pJS.canvas.w;pJS.canvas.el.height=pJS.canvas.h;
pJS.fn.canvasPaint();if(!pJS.particles.anim.enable){pJS.fn.particlesRemove();pJS.fn.canvasRemove();a();}};};pJS.fn.canvasPaint=function(){pJS.canvas.ctx.fillRect(0,0,pJS.canvas.w,pJS.canvas.h);
};pJS.fn.canvasRemove=function(){pJS.canvas.ctx.clearRect(0,0,pJS.canvas.w,pJS.canvas.h);};pJS.fn.particle=function(e,f){this.x=Math.random()*pJS.canvas.w;
this.y=Math.random()*pJS.canvas.h;if(pJS.retina){if(pJS.particles.size_random){this.radius=Math.random()*pJS.particles.size*2;}else{this.radius=pJS.particles.size*2;
}}else{if(pJS.particles.size_random){this.radius=Math.random()*pJS.particles.size*1;}else{this.radius=pJS.particles.size*1;}}this.color=e;this.opacity=f;
this.vx=-0.5+Math.random();this.vy=-0.5+Math.random();this.draw=function(){pJS.canvas.ctx.fillStyle="rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.opacity+")";
pJS.canvas.ctx.beginPath();switch(pJS.particles.shape){case"circle":pJS.canvas.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);break;case"edge":pJS.canvas.ctx.rect(this.x,this.y,this.radius*2,this.radius*2);
break;case"triangle":pJS.canvas.ctx.moveTo(this.x,this.y);pJS.canvas.ctx.lineTo(this.x+this.radius,this.y+this.radius*2);pJS.canvas.ctx.lineTo(this.x-this.radius,this.y+this.radius*2);
pJS.canvas.ctx.closePath();break;}pJS.canvas.ctx.fill();};};pJS.fn.particlesCreate=function(){for(var e=0;e<pJS.particles.nb;e++){pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb,pJS.particles.opacity));
}};pJS.fn.particlesAnimate=function(){for(var f=0;f<pJS.particles.array.length;f++){var h=pJS.particles.array[f];h.x+=h.vx*(pJS.particles.anim.speed/2);
h.y+=h.vy*(pJS.particles.anim.speed/2);if(h.x-h.radius>pJS.canvas.w){h.x=h.radius;}else{if(h.x+h.radius<0){h.x=pJS.canvas.w+h.radius;}}if(h.y-h.radius>pJS.canvas.h){h.y=h.radius;
}else{if(h.y+h.radius<0){h.y=pJS.canvas.h+h.radius;}}for(var e=f+1;e<pJS.particles.array.length;e++){var g=pJS.particles.array[e];if(pJS.particles.line_linked.enable_auto){pJS.fn.vendors.distanceParticles(h,g);
}if(pJS.interactivity.enable){switch(pJS.interactivity.mode){case"grab":pJS.fn.vendors.interactivity.grabParticles(h,g);break;}}}}};pJS.fn.particlesDraw=function(){pJS.canvas.ctx.clearRect(0,0,pJS.canvas.w,pJS.canvas.h);
pJS.fn.particlesAnimate();for(var e=0;e<pJS.particles.array.length;e++){var f=pJS.particles.array[e];f.draw("rgba("+f.color.r+","+f.color.g+","+f.color.b+","+f.opacity+")");
}};pJS.fn.particlesRemove=function(){pJS.particles.array=[];};pJS.fn.vendors.distanceParticles=function(l,j){var g=l.x-j.x,f=l.y-j.y,k=Math.sqrt(g*g+f*f);
if(k<=pJS.particles.line_linked.distance){var e=pJS.particles.line_linked.color_rgb_line;pJS.canvas.ctx.beginPath();pJS.canvas.ctx.strokeStyle="rgba("+e.r+","+e.g+","+e.b+","+(pJS.particles.line_linked.opacity-k/pJS.particles.line_linked.distance)+")";
pJS.canvas.ctx.moveTo(l.x,l.y);pJS.canvas.ctx.lineTo(j.x,j.y);pJS.canvas.ctx.lineWidth=pJS.particles.line_linked.width;pJS.canvas.ctx.stroke();pJS.canvas.ctx.closePath();
if(pJS.particles.line_linked.condensed_mode.enable){var g=l.x-j.x;f=l.y-j.y;var i=g/(pJS.particles.line_linked.condensed_mode.rotateX*1000),h=f/(pJS.particles.line_linked.condensed_mode.rotateY*1000);
j.vx+=i;j.vy+=h;}}};pJS.fn.vendors.interactivity.listeners=function(){if(pJS.interactivity.detect_on=="window"){var e=window;}else{var e=pJS.canvas.el;
}e.onmousemove=function(f){if(pJS.retina){pJS.interactivity.mouse.pos_x=f.pageX*2;pJS.interactivity.mouse.pos_y=f.pageY*2;}else{pJS.interactivity.mouse.pos_x=f.pageX;
pJS.interactivity.mouse.pos_y=f.pageY;}pJS.interactivity.status="mousemove";};e.onmouseleave=function(f){pJS.interactivity.mouse.pos_x=0;pJS.interactivity.mouse.pos_y=0;
pJS.interactivity.status="mouseleave";};};pJS.fn.vendors.interactivity.grabParticles=function(j,i){var m=j.x-i.x,k=j.y-i.y,h=Math.sqrt(m*m+k*k);var l=j.x-pJS.interactivity.mouse.pos_x,f=j.y-pJS.interactivity.mouse.pos_y,g=Math.sqrt(l*l+f*f);
if(h<=pJS.particles.line_linked.distance&&g<=pJS.interactivity.mouse.distance&&pJS.interactivity.status=="mousemove"){var e=pJS.particles.line_linked.color_rgb_line;
pJS.canvas.ctx.beginPath();pJS.canvas.ctx.strokeStyle="rgba("+e.r+","+e.g+","+e.b+","+(pJS.particles.line_linked.opacity-g/pJS.interactivity.mouse.distance)+")";
pJS.canvas.ctx.moveTo(j.x,j.y);pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x,pJS.interactivity.mouse.pos_y);pJS.canvas.ctx.lineWidth=pJS.particles.line_linked.width;
pJS.canvas.ctx.stroke();pJS.canvas.ctx.closePath();}};function a(){pJS.fn.canvasInit();pJS.fn.canvasSize();pJS.fn.canvasPaint();pJS.fn.particlesCreate();
pJS.fn.particlesDraw();}function b(){pJS.fn.particlesDraw();requestAnimFrame(b);}a();if(pJS.particles.anim.enable){b();}if(pJS.interactivity.enable){pJS.fn.vendors.interactivity.listeners();
}}window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1000/60);
};})();function hexToRgb(c){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;c=c.replace(b,function(e,h,f,d){return h+h+f+f+d+d;});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null;}window.particlesJS=function(d,c){if(typeof(d)!="string"){c=d;d="particles-js";
}if(!d){d="particles-js";}var b=document.createElement("canvas");b.style.width="100%";b.style.height="100%";var a=document.getElementById(d).appendChild(b);
if(a!=null){launchParticlesJS(d,c);}};
