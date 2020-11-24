(function () {
    'use strict';

    const createRouter = (config) => {

        Object.keys(config).forEach((key, i) => {
            const container = document.getElementById(key);
            container.innerHTML = config[key];
        });

        function initHash() {
            let curKey = location.hash.replace('#', '');
            curKey = curKey || 'index';

            Object.keys(config).forEach((key, i) => {
                const container = document.getElementById(key);

                if (curKey === key) {
                    container.style.display = '';
                } else {
                    container.style.display = 'none';
                }
            });
        }

        if (!window.onhashchange) {
            window.onhashchange = initHash;
        }

        initHash();
    };

    /**
     * doT.js https://github.com/olado/doT
     */
    !function () { var u, d = { name: "doT", version: "1.1.1", templateSettings: { evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g, interpolate: /\{\{=([\s\S]+?)\}\}/g, encode: /\{\{!([\s\S]+?)\}\}/g, use: /\{\{#([\s\S]+?)\}\}/g, useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g, define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, defineParams: /^\s*([\w$]+):([\s\S]+)/, conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g, varname: "it", strip: !0, append: !0, selfcontained: !1, doNotSkipEncoded: !1 }, template: void 0, compile: void 0, log: !0 }; d.encodeHTMLSource = function (e) { var n = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" }, t = e ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g; return function (e) { return e ? e.toString().replace(t, function (e) { return n[e] || e }) : "" } }, u = function () { return this || (0, eval)("this") }(), "undefined" != typeof module && module.exports ? module.exports = d : "function" == typeof define && define.amd ? define(function () { return d }) : u.doT = d; var s = { append: { start: "'+(", end: ")+'", startencode: "'+encodeHTML(" }, split: { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" } }, p = /$^/; function l(e) { return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ") } d.template = function (e, n, t) { var r, o, a = (n = n || d.templateSettings).append ? s.append : s.split, c = 0, i = n.use || n.define ? function r(o, e, a) { return ("string" == typeof e ? e : e.toString()).replace(o.define || p, function (e, r, n, t) { return 0 === r.indexOf("def.") && (r = r.substring(4)), r in a || (":" === n ? (o.defineParams && t.replace(o.defineParams, function (e, n, t) { a[r] = { arg: n, text: t }; }), r in a || (a[r] = t)) : new Function("def", "def['" + r + "']=" + t)(a)), "" }).replace(o.use || p, function (e, n) { o.useParams && (n = n.replace(o.useParams, function (e, n, t, r) { if (a[t] && a[t].arg && r) { var o = (t + ":" + r).replace(/'|\\/g, "_"); return a.__exp = a.__exp || {}, a.__exp[o] = a[t].text.replace(new RegExp("(^|[^\\w$])" + a[t].arg + "([^\\w$])", "g"), "$1" + r + "$2"), n + "def.__exp['" + o + "']" } })); var t = new Function("def", "return " + n)(a); return t ? r(o, t, a) : t }) }(n, e, t || {}) : e; i = ("var out='" + (n.strip ? i.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : i).replace(/'|\\/g, "\\$&").replace(n.interpolate || p, function (e, n) { return a.start + l(n) + a.end }).replace(n.encode || p, function (e, n) { return r = !0, a.startencode + l(n) + a.end }).replace(n.conditional || p, function (e, n, t) { return n ? t ? "';}else if(" + l(t) + "){out+='" : "';}else{out+='" : t ? "';if(" + l(t) + "){out+='" : "';}out+='" }).replace(n.iterate || p, function (e, n, t, r) { return n ? (c += 1, o = r || "i" + c, n = l(n), "';var arr" + c + "=" + n + ";if(arr" + c + "){var " + t + "," + o + "=-1,l" + c + "=arr" + c + ".length-1;while(" + o + "<l" + c + "){" + t + "=arr" + c + "[" + o + "+=1];out+='") : "';} } out+='" }).replace(n.evaluate || p, function (e, n) { return "';" + l(n) + "out+='" }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), r && (n.selfcontained || !u || u._encodeHTML || (u._encodeHTML = d.encodeHTMLSource(n.doNotSkipEncoded)), i = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + d.encodeHTMLSource.toString() + "(" + (n.doNotSkipEncoded || "") + "));" + i); try { return new Function(n.varname, i) } catch (e) { throw "undefined" != typeof console && console.log("Could not create a template function: " + i), e } }, d.compile = function (e, n) { return d.template(e, null, n) }; }();

    const eval2 = eval;
    const DATA_EVENT_UNIQUE_ID_KEY = 'data_event_unique_id';
    const ON_CLICK = 'onclick';
    const $EVENT = '$event';
    const eventsBus = {
        onclick: {}
    };

    const bindEvent = (node, type, events = {}) => {
        if (node[type]) {
            let strName = '';
            let strParams = '';
            const eventHandler = node.getAttribute(type).trim();// TODO trim        

            if (eventHandler.endsWith(')')) {// TODO endsWith
                //传递参数
                const index = eventHandler.indexOf('(');
                strName = eventHandler.substring(0, index);
                strParams = eventHandler.substring(index + 1, eventHandler.length - 1);
            } else {
                //未传递参数
                strName = eventHandler;
            }
            Object.keys(events).forEach(key => {
                if (key === strName) {
                    const uniqueId = `${type}_${Object.keys(eventsBus[type]).length + 1}`;
                    node.setAttribute(DATA_EVENT_UNIQUE_ID_KEY, uniqueId);
                    if (strParams) {
                        const hasEventArg = strParams.indexOf($EVENT) === 0;
                        if (hasEventArg) {
                            strParams = strParams.replace($EVENT, '');
                        }
                        eventsBus[type][uniqueId] = function (e) {
                            const args = eval2(`[${strParams}]`);
                            if (hasEventArg) {
                                args[0] = e;
                            }
                            events[key](...args);
                        };
                    } else {
                        eventsBus[type][uniqueId] = function (e) {
                            events[key](e);
                        };
                    }
                }
            });
            node.removeAttribute(type);
        }
    };

    document.addEventListener('click', function (e) {
        const uniqueId = e.target.getAttribute(DATA_EVENT_UNIQUE_ID_KEY);
        eventsBus[ON_CLICK][uniqueId] && eventsBus[ON_CLICK][uniqueId](e);
    });

    const createComponent = (tpl, dataAndClass, events) => {
        const html = doT.template(tpl)(dataAndClass);
        const container = document.createElement('div');
        container.innerHTML = html;
        const nodes = container.getElementsByTagName('*');
        for (let i = 0, l = nodes.length; i < l; i++) {
            bindEvent(nodes[i], ON_CLICK, events);
        }

        return container.innerHTML;
    };

    var tpl = "<div>\r\n    Hello：{{=it.name}}\r\n</div>";

    const Header = (props) => {
        const data = props.data;

        const component = createComponent(tpl, data);
        return component;
    };

    var tpl$1 = "<ul class=\"{{=it.style.list}}\">\r\n    {{~ it.data.list:item}}\r\n    {{=it.data.child(item)}}\r\n    {{~}}\r\n</ul>";

    var tpl$2 = "<li id=\"{{=it.data.id}}\" onclick='onItemClick($event,{{=it.data.id}},\"{{=it.data.name}}\",{\"id\":{{=it.data.id}},\"name\":\"{{=it.data.name}}\"})' class=\"{{=it.style.item}} {{=it.style['item-cursor']}}\">\r\n    {{=it.data.name}}\r\n</li>";

    var style = {"item":"style_item__1agih","item-cursor":"style_item-cursor__1mFmw"};

    const Li = (props) => {
        const data = props.data;
        const events = {
            onItemClick: function (e, id, name, obj) {
                console.log(id + ',' + name);
                console.log(JSON.stringify(obj));
                //Dom局部更新
                data.name = 'click here';
                const component = createComponent(tpl$2, { data, style }, events);

                //reRender
                e.target.outerHTML = component;
            }
        };

        const component = createComponent(tpl$2, { data, style }, events);    
        return component;
    };

    var style$1 = {"list":"style_list__39_H_","item":"style_item__7WMPt"};

    const List = (props) => {
        const data = {
            list: props.data,
            child: function (item) {
                return Li({ data: item });
            }
        };

        const component = createComponent(tpl$1, { data, style: style$1 });
        return component;
    };

    var tpl$3 = "<div>\r\n    {{=it.header}}\r\n    {{=it.list}}\r\n</div>\r\n<a href=\"#profile\">详情页</a>";

    const header = Header({ data: { name: 'Fedhong' } });
    // TODO AJAX获取
    const list = List({ data: [{ id: 1, name: 'AA,AAA,AA' }, { id: 2, name: 'BBBBBBBB' }, { id: 3, name: 'CCCCCCCC' }] });

    const Index = (props) => {
        const data = {
            header,
            list
        };

        const component = createComponent(tpl$3, data);

        return component;
    };

    var tpl$4 = "<div>\r\n    <div class=\"{{=it.style.photo}}\"></div>个人信息页面\r\n</div>\r\n<div>\r\n    <img src=\"assets/img/a.jpeg\">\r\n</div>\r\n<a href=\"#index\">首页</a>";

    var style$2 = {"photo":"style_photo__r_-zJ"};

    const profile = (props) => {
        const data = {};
        const events = {};
        const component = createComponent(tpl$4, { data, style: style$2 }, events);

        return component;
    };

    const RouterConfig = {
        index: Index(),
        profile: profile()
    };

    createRouter(RouterConfig);


    // import Index from './pages/index/script';
    // document.getElementById('index').innerHTML = Index;

}());
