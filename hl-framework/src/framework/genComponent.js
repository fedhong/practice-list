/**
 * 运行时
 */
import renderHTML from './renderHTML';

const eventsBus = {
    'onclick': {}
};

const bindEvent = (node, type, events = {}) => {
    if (node[type]) {
        const eventHandler = node.getAttribute(type);
        console.log('eventHandler', eventHandler)
        const eventNameAndParams = eventHandler.split('(');// TODO 参数变为string...
        const methodName = eventNameAndParams[0];
        const params = eventNameAndParams[1] ? eventNameAndParams[1].replace(')', '').split(',') : null;
        console.log('params', params)
        Object.keys(events).forEach(key => {
            if (key === methodName) {
                // TODO id不存在的情况，添加唯一标示
                eventsBus[type][node.id] = function () {
                    events[key](...params);
                };
            }
        })
        node.removeAttribute(type);
    }
}

document.addEventListener('click', function (e) {
    const id = e.target.id;
    eventsBus['onclick'][id] && eventsBus['onclick'][id]();
    // TODO 根据唯一标识，判断冒泡目标    
})

const genComponent = (tpl, data, events) => {
    const html = renderHTML(tpl, data);
    const container = document.createElement('div');
    container.innerHTML = html;
    const nodes = container.getElementsByTagName('*');
    for (let i = 0, l = nodes.length; i < l; i++) {
        bindEvent(nodes[i], 'onclick', events);
    }

    return container.innerHTML;
}

export default genComponent