!function(){"use strict";!function(){var e,t={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0,encodeHTMLSource:function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},n=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(n,(function(e){return t[e]||e})):""}}};e=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd?define((function(){return t})):e.doT=t;var n={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},r=/$^/;function a(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}t.template=function(o,i,s){var c,d,l=(i=i||t.templateSettings).append?n.append:n.split,u=0,f=i.use||i.define?function e(t,n,a){return("string"==typeof n?n:n.toString()).replace(t.define||r,(function(e,n,r,o){return 0===n.indexOf("def.")&&(n=n.substring(4)),n in a||(":"===r?(t.defineParams&&o.replace(t.defineParams,(function(e,t,r){a[n]={arg:t,text:r}})),n in a||(a[n]=o)):new Function("def","def['"+n+"']="+o)(a)),""})).replace(t.use||r,(function(n,r){t.useParams&&(r=r.replace(t.useParams,(function(e,t,n,r){if(a[n]&&a[n].arg&&r){var o=(n+":"+r).replace(/'|\\/g,"_");return a.__exp=a.__exp||{},a.__exp[o]=a[n].text.replace(new RegExp("(^|[^\\w$])"+a[n].arg+"([^\\w$])","g"),"$1"+r+"$2"),t+"def.__exp['"+o+"']"}})));var o=new Function("def","return "+r)(a);return o?e(t,o,a):o}))}(i,o,s||{}):o;f=("var out='"+(i.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(i.interpolate||r,(function(e,t){return l.start+a(t)+l.end})).replace(i.encode||r,(function(e,t){return c=!0,l.startencode+a(t)+l.end})).replace(i.conditional||r,(function(e,t,n){return t?n?"';}else if("+a(n)+"){out+='":"';}else{out+='":n?"';if("+a(n)+"){out+='":"';}out+='"})).replace(i.iterate||r,(function(e,t,n,r){return t?(u+=1,d=r||"i"+u,t=a(t),"';var arr"+u+"="+t+";if(arr"+u+"){var "+n+","+d+"=-1,l"+u+"=arr"+u+".length-1;while("+d+"<l"+u+"){"+n+"=arr"+u+"["+d+"+=1];out+='"):"';} } out+='"})).replace(i.evaluate||r,(function(e,t){return"';"+a(t)+"out+='"}))+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),c&&(i.selfcontained||!e||e._encodeHTML||(e._encodeHTML=t.encodeHTMLSource(i.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+t.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+f);try{return new Function(i.varname,f)}catch(o){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),o}},t.compile=function(e,n){return t.template(e,null,n)}}();const e=eval,t="data_event_unique_id",n="onclick",r="$event",a={onclick:{}},o=(n,o,i={})=>{if(n[o]){let s="",c="";const d=n.getAttribute(o).trim();if(d.endsWith(")")){const e=d.indexOf("(");s=d.substring(0,e),c=d.substring(e+1,d.length-1)}else s=d;Object.keys(i).forEach((d=>{if(d===s){const s=(e=>{const t=["F","_","E","d","H","o","N","g","V","5"],n=`${Object.keys(a[e]).length+1}`.split(""),r=[];for(let e=0,a=n.length;e<a;e++)r.push(t[n[e]]);return`${e}_${r.join("_")}`})(o);if(n.setAttribute(t,s),c){const t=0===c.indexOf(r);t&&(c=c.replace(r,"")),a[o][s]=function(n){const r=e(`[${c}]`);return t&&(r[0]=n),i[d](...r)}}else a[o][s]=function(e){return i[d](e)}}})),n.removeAttribute(o)}};document.addEventListener("click",(function(e){const n=[];let r=e.target;for(;"HTML"!==r.tagName;){const e=r.getAttribute(t);e&&n.push(e),r=r.parentNode}for(let t=0,r=n.length;t<r;t++){const r=n[t];if(!1===(a.onclick[r]&&a.onclick[r](e)))break}}));const i=(e,t,r)=>{const a=doT.template(e)(t),i=document.createElement("div");i.innerHTML=a;const s=i.getElementsByTagName("*");for(let e=0,t=s.length;e<t;e++)o(s[e],n,r);return i.innerHTML};var s={welcome:"style_welcome__3EYCC"};const c=e=>{const t=e.data;return i('<div class="{{=it.style.welcome}}">\r\n    Welcome to hl-framework：{{=it.data.name}}\r\n</div>',{data:t,style:s})};var d={footer:"style_footer__26q8n"};const l=e=>i('<div class="{{=it.style.footer}}">\r\n    <a href="#index">首页</a>&nbsp;|&nbsp;<a href="#profile">详情页</a>\r\n</div>',{data:{},style:d});var u='<li id="{{=it.data.id}}" onclick=\'onItemClick($event,{{=it.data.id}},"{{=it.data.name}}",{"id":{{=it.data.id}},"name":"{{=it.data.name}}"})\' class="{{=it.style.item}} {{=it.style[\'item-cursor\']}}">\r\n    {{=it.data.name}}\r\n</li>',f={item:"style_item__1agih","item-cursor":"style_item-cursor__1mFmw"};var p={list:"style_list__39_H_",item:"style_item__7WMPt"};const m=c({data:{name:"Fedhong"}}),g=l(),_=(e=>{const t={list:e.data,child:function(e){return(e=>{const t=e.data,n={onItemClick:function(e,r,a,o){console.log(r+","+a),console.log(JSON.stringify(o)),t.name="click here";const s=i(u,{data:t,style:f},n);e.target.outerHTML=s}};return i(u,{data:t,style:f},n)})({data:e})}};return i('<ul class="{{=it.style.list}}">\r\n    {{~ it.data.list:item}}\r\n    {{=it.data.child(item)}}\r\n    {{~}}\r\n</ul>',{data:t,style:p})})({data:[{id:1,name:"AA,AAA,AA"},{id:2,name:"BBBBBBBB"},{id:3,name:"CCCCCCCC"}]});var v={user:"style_user__ALLkF",photo:"style_photo__r_-zJ"};const h=c({data:{name:"Fedhong"}}),y=l();(e=>{let t=Date.now();function n(){let t=location.hash.replace("#","");t=t||"index",Object.keys(e).forEach(((e,n)=>{const r=document.getElementById(e);r&&(r.style.display=t===e?"":"none")}))}Object.keys(e).forEach(((t,n)=>{const r=document.getElementById(t);r&&(r.innerHTML=e[t],r.style.display="none")})),window.onhashchange||(window.onhashchange=n),n(),console.log(`渲染耗时：${Date.now()-t} ms`)})({index:i("<div>\r\n    {{=it.data.header}}\r\n    {{=it.data.list}}\r\n    {{=it.data.footer}}\r\n</div>",{data:{header:m,list:_,footer:g}}),profile:i('{{=it.data.header}}\r\n<div class="{{=it.style.user}}">\r\n    <div class="{{=it.style.photo}}"></div>一只小龙虾\r\n</div>\r\n<div>\r\n    <img src="assets/img/a.jpeg">\r\n</div>\r\n{{=it.data.footer}}',{data:{header:h,footer:y},style:v},{})})}();
