!function(e){function t(t){for(var i,s,u=t[0],a=t[1],f=t[2],c=0,h=[];c<u.length;c++)s=u[c],r[s]&&h.push(r[s][0]),r[s]=0;for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);for(d&&d(t);h.length;)h.shift()();return o.push.apply(o,f||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,u=1;u<n.length;u++){var a=n[u];0!==r[a]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},r={0:0},o=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var u=window.webpackJsonp=window.webpackJsonp||[],a=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=a;o.push([2,1]),n()}([,,function(e,t,n){"use strict";var i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),r=(d(n(1)),d(n(4))),o=d(n(5)),s=d(n(6)),u=d(n(7)),a=d(n(8)),f=d(n(9));function d(e){return e&&e.__esModule?e:{default:e}}var c=void 0,h=void 0,l=document.getElementById("bg"),p=new s.default(l);function v(){null!=c&&null!=h&&function(){var e=new r.default,t=new u.default(c.vs,c.fs,{startTime:{type:"f",value:0},hover:{type:"f",value:.1},deviceorientation:{type:"v2",value:new i.Vector2(0,0)},isSp:{type:"f",value:e.isSp}},l),n=new a.default(p.rendererOR.texture,h.vs,h.fs);(0,f.default)(p,t,n,l)}()}window.onload=function(){l.classList&&(p.run=!1,c=null,h=null,new o.default("/assets/shader/scene.vert","/assets/shader/scene.frag",function(e){c=e,v()}),new o.default("/assets/shader/post.vert","/assets/shader/post.frag",function(e){h=e,v()}))}},function(e,t){var n,i,r=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var a,f=[],d=!1,c=-1;function h(){d&&a&&(d=!1,a.length?f=a.concat(f):c=-1,f.length&&l())}function l(){if(!d){var e=u(h);d=!0;for(var t=f.length;t;){for(a=f,f=[];++c<t;)a&&a[c].run();c=-1,t=f.length}a=null,d=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function v(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];f.push(new p(e,t)),1!==f.length||d||u(l)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=v,r.addListener=v,r.once=v,r.off=v,r.removeListener=v,r.removeAllListeners=v,r.emit=v,r.prependListener=v,r.prependOnceListener=v,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){var i,r;void 0===(r="function"==typeof(i=function(){function e(){this._ua=navigator.userAgent,this._ver=navigator.appVersion;var e=this._ua.toLowerCase(),t=this._ver.toLowerCase();this.isMSIE=e.indexOf("msie")>-1&&-1==e.indexOf("opera"),this.isIE6=this.isMSIE&&t.indexOf("msie 6.")>-1,this.isIE7=this.isMSIE&&t.indexOf("msie 7.")>-1,this.isIE8=this.isMSIE&&t.indexOf("msie 8.")>-1,this.isIE9=this.isMSIE&&t.indexOf("msie 9.")>-1,this.isIE10=this.isMSIE&&t.indexOf("msie 10.")>-1,this.isIE11=e.indexOf("trident/7")>-1,this.isIE=this.isMSIE||this.isIE11,this.isEdge=e.indexOf("edge")>-1,this.isChrome=e.indexOf("chrome")>-1&&-1==e.indexOf("edge"),this.isFirefox=e.indexOf("firefox")>-1,this.isSafari=e.indexOf("safari")>-1&&-1==e.indexOf("chrome"),this.isOpera=e.indexOf("opera")>-1,this.isIphone=e.indexOf("iphone")>0,this.isIpod=e.indexOf("ipod")>0,this.isAndroid=e.indexOf("android")>0&&e.indexOf("mobile")>0,this.isWinPhone=e.indexOf("windows phone")>0,this.isIpad=e.indexOf("ipad")>0,this.isAndroidTab=e.indexOf("android")>0&&-1==e.indexOf("mobile"),this.isSp=this.isIphone||this.isIpod||this.isAndroid||this.isWinPhone,this.isTab=this.isIpad||this.isAndroidTab,this.isTouch="createTouch"in document||"ontouchstart"in document}return e.prototype.GetIosVersion=function(){var e,t;return this.isIphone||this.isIpod||this.isIpad?(e=this._ver.match(/OS (\d+)_(\d+)_?(\d+)?/),t=[parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3]||0,10)],Number(t[0]+"."+t[1])):t},e.prototype.GetAndroidVersion=function(){if(this.isAndroid)return Number(parseFloat(this._ua.slice(this._ua.indexOf("Android")+8)))},e})?i.call(t,n,t,e):i)||(e.exports=r)}]);