/**
 * doT.js https://github.com/olado/doT
 */
!function () { "use strict"; var u, d = { name: "doT", version: "1.1.1", templateSettings: { evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g, interpolate: /\{\{=([\s\S]+?)\}\}/g, encode: /\{\{!([\s\S]+?)\}\}/g, use: /\{\{#([\s\S]+?)\}\}/g, useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g, define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, defineParams: /^\s*([\w$]+):([\s\S]+)/, conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g, varname: "it", strip: !0, append: !0, selfcontained: !1, doNotSkipEncoded: !1 }, template: void 0, compile: void 0, log: !0 }; d.encodeHTMLSource = function (e) { var n = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" }, t = e ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g; return function (e) { return e ? e.toString().replace(t, function (e) { return n[e] || e }) : "" } }, u = function () { return this || (0, eval)("this") }(), "undefined" != typeof module && module.exports ? module.exports = d : "function" == typeof define && define.amd ? define(function () { return d }) : u.doT = d; var s = { append: { start: "'+(", end: ")+'", startencode: "'+encodeHTML(" }, split: { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" } }, p = /$^/; function l(e) { return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ") } d.template = function (e, n, t) { var r, o, a = (n = n || d.templateSettings).append ? s.append : s.split, c = 0, i = n.use || n.define ? function r(o, e, a) { return ("string" == typeof e ? e : e.toString()).replace(o.define || p, function (e, r, n, t) { return 0 === r.indexOf("def.") && (r = r.substring(4)), r in a || (":" === n ? (o.defineParams && t.replace(o.defineParams, function (e, n, t) { a[r] = { arg: n, text: t } }), r in a || (a[r] = t)) : new Function("def", "def['" + r + "']=" + t)(a)), "" }).replace(o.use || p, function (e, n) { o.useParams && (n = n.replace(o.useParams, function (e, n, t, r) { if (a[t] && a[t].arg && r) { var o = (t + ":" + r).replace(/'|\\/g, "_"); return a.__exp = a.__exp || {}, a.__exp[o] = a[t].text.replace(new RegExp("(^|[^\\w$])" + a[t].arg + "([^\\w$])", "g"), "$1" + r + "$2"), n + "def.__exp['" + o + "']" } })); var t = new Function("def", "return " + n)(a); return t ? r(o, t, a) : t }) }(n, e, t || {}) : e; i = ("var out='" + (n.strip ? i.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : i).replace(/'|\\/g, "\\$&").replace(n.interpolate || p, function (e, n) { return a.start + l(n) + a.end }).replace(n.encode || p, function (e, n) { return r = !0, a.startencode + l(n) + a.end }).replace(n.conditional || p, function (e, n, t) { return n ? t ? "';}else if(" + l(t) + "){out+='" : "';}else{out+='" : t ? "';if(" + l(t) + "){out+='" : "';}out+='" }).replace(n.iterate || p, function (e, n, t, r) { return n ? (c += 1, o = r || "i" + c, n = l(n), "';var arr" + c + "=" + n + ";if(arr" + c + "){var " + t + "," + o + "=-1,l" + c + "=arr" + c + ".length-1;while(" + o + "<l" + c + "){" + t + "=arr" + c + "[" + o + "+=1];out+='") : "';} } out+='" }).replace(n.evaluate || p, function (e, n) { return "';" + l(n) + "out+='" }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), r && (n.selfcontained || !u || u._encodeHTML || (u._encodeHTML = d.encodeHTMLSource(n.doNotSkipEncoded)), i = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + d.encodeHTMLSource.toString() + "(" + (n.doNotSkipEncoded || "") + "));" + i); try { return new Function(n.varname, i) } catch (e) { throw "undefined" != typeof console && console.log("Could not create a template function: " + i), e } }, d.compile = function (e, n) { return d.template(e, null, n) } }();

const eval2 = eval;
const DATA_EVENT_UNIQUE_ID_KEY = 'data_event_unique_id';
const ON_CLICK = 'onclick';
const $EVENT = '$event';
const eventsBus = {
    onclick: {}
};

const genUniqueId = (type) => {
    const CRC_TAB = ['F', '_', 'E', 'd', 'H', 'o', 'N', 'g', 'V', '5'];
    const current = `${Object.keys(eventsBus[type]).length + 1}`.split('');
    const res = [];
    for (let i = 0, l = current.length; i < l; i++) {
        res.push(CRC_TAB[current[i]]);
    }

    return `${type}_${res.join('_')}`;
}

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
                const uniqueId = genUniqueId(type);
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
                        return events[key](...args);
                    };
                } else {
                    eventsBus[type][uniqueId] = function (e) {
                        return events[key](e);
                    };
                }
            }
        })
        node.removeAttribute(type);
    }
}

document.addEventListener('click', function (e) {

    const list = [];
    let cur = e.target
    while (cur.tagName !== 'HTML') {
        const uniqueId = cur.getAttribute(DATA_EVENT_UNIQUE_ID_KEY);
        uniqueId && list.push(uniqueId);
        cur = cur.parentNode;
    }
    for (let i = 0, l = list.length; i < l; i++) {
        const uniqueId = list[i];
        const bubbling = eventsBus[ON_CLICK][uniqueId] && eventsBus[ON_CLICK][uniqueId](e);
        if (bubbling === false) {
            break;
        }
    }
})

const createComponent = (tpl, dataAndClass, events) => {
    const html = doT.template(tpl)(dataAndClass);
    const container = document.createElement('div');
    container.innerHTML = html;
    const nodes = container.getElementsByTagName('*');
    for (let i = 0, l = nodes.length; i < l; i++) {
        bindEvent(nodes[i], ON_CLICK, events);
    }

    return container.innerHTML;
}

export default createComponent