import{getArrayCopy}from"../raphael.lib";export default(function(a){var b,c,d=/[\.\/]/,g=/\s*,\s*/,e=function(c,a){return c-a},h={n:{}},f=function(){for(var a=0,b=this.length;a<b;a++)if("undefined"!=typeof this[a])return this[a]},j=function(){for(var a=this.length;--a;)if("undefined"!=typeof this[a])return this[a]},i=Object.prototype.toString,k=String,l=Array.isArray||function(a){return a instanceof Array||"[object Array]"==i.call(a)},m=function(a,d){var g,h=c,k=getArrayCopy(arguments),n=Array.prototype.slice.call(k,2),o=m.listeners(a),p=0,q=[],r={},s=[],t=b;s.firstDefined=f,s.lastDefined=j,b=a,c=0;for(var u=0,v=o.length;u<v;u++)"zIndex"in o[u]&&(q.push(o[u].zIndex),0>o[u].zIndex&&(r[o[u].zIndex]=o[u]));for(q.sort(e);0>q[p];)if(g=r[q[p++]],s.push(g.apply(d,n)),c)return c=h,s;for(u=0;u<v;u++)if(g=o[u],"zIndex"in g){if(g.zIndex==q[p]){if(s.push(g.apply(d,n)),c)break;do if(p++,g=r[q[p]],g&&s.push(g.apply(d,n)),c)break;while(g)}else r[g.zIndex]=g;}else if(s.push(g.apply(d,n)),c)break;return c=h,b=t,s};return m._events=h,m.listeners=function(a){var b,c,f,g,m,n,o,p,q=l(a)?a:a.split(d),r=h,s=[r],t=[];for(g=0,m=q.length;g<m;g++){for(p=[],n=0,o=s.length;n<o;n++)for(r=s[n].n,c=[r[q[g]],r["*"]],f=2;f--;)b=c[f],b&&(p.push(b),t=t.concat(b.f||[]));s=p}return t},m.separator=function(a){a?(a=k(a).replace(/(?=[\.\^\]\[\-])/g,"\\"),a="["+a+"]",d=new RegExp(a)):d=/[\.\/]/},m.on=function(a,b){if("function"!=typeof b)return function(){};for(var c=l(a)?l(a[0])?a:[a]:k(a).split(g),e=0,f=c.length;e<f;e++)(function(a){for(var c,f=l(a)?a:k(a).split(d),g=h,j=0,m=f.length;j<m;j++)g=g.n,g=g.hasOwnProperty(f[j])&&g[f[j]]||(g[f[j]]={n:{}});for(g.f=g.f||[],j=0,m=g.f.length;j<m;j++)if(g.f[j]==b){c=!0;break}c||g.f.push(b)})(c[e]);return function(a){+a==+a&&(b.zIndex=+a)}},m.f=function(a){var b=getArrayCopy(arguments),c=[].slice.call(b,1);return function(){m.apply(null,[a,null].concat(c).concat([].slice.call(b,0)))}},m.stop=function(){c=1},m.nt=function(a){var c=l(b)?b.join("."):b;return a?new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)").test(c):c},m.nts=function(){return l(b)?b:b.split(d)},m.off=m.unbind=function(a,b){if(!a)return void(m._events=h={n:{}});var c=l(a)?l(a[0])?a:[a]:k(a).split(g);if(1<c.length){for(var f=0,n=c.length;f<n;f++)m.off(c[f],b);return}c=l(a)?a:k(a).split(d);var o,p,q,f,n,r,s,t=[h],u=[];for(f=0,n=c.length;f<n;f++)for(r=0;r<t.length;r+=q.length-2){if(q=[r,1],o=t[r].n,"*"!=c[f])o[c[f]]&&(q.push(o[c[f]]),u.unshift({n:o,name:c[f]}));else for(p in o)o.hasOwnProperty(p)&&(q.push(o[p]),u.unshift({n:o,name:p}));t.splice.apply(t,q)}for(f=0,n=t.length;f<n;f++)for(o=t[f];o.n;){if(b){if(o.f){for(r=0,s=o.f.length;r<s;r++)if(o.f[r]==b){o.f.splice(r,1);break}o.f.length||delete o.f}for(p in o.n)if(o.n.hasOwnProperty(p)&&o.n[p].f){var v=o.n[p].f;for(r=0,s=v.length;r<s;r++)if(v[r]==b){v.splice(r,1);break}v.length||delete o.n[p].f}}else for(p in delete o.f,o.n)o.n.hasOwnProperty(p)&&o.n[p].f&&delete o.n[p].f;o=o.n}prune:for(f=0,n=u.length;f<n;f++){for(p in o=u[f],o.n[o.name].f)continue prune;for(p in o.n[o.name].n)continue prune;delete o.n[o.name]}},m.once=function(a,b){var c=function(){return m.off(a,c),b.apply(this,arguments)};return m.on(a,c)},m.version="0.5.3",m.toString=function(){return"You are running Eve 0.5.3"},a.eve=m,m})("undefined"==typeof window?"undefined"==typeof global?null:global:window);