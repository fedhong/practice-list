/**
 * 运行时
 */
import renderHTML from './renderHTML';

const eventsBus = {

};
const eventDatas = {

};

document.addEventListener("click", function (e) {
    const id = e.target.id;
    eventsBus[id] && eventsBus[id]();
    // TODO 根据唯一标识，判断冒泡目标
    // if (id == 1) {
    //     const de = e.target.attributes['data-event'];
    //     const data = de ? de.value : null;
    //     eventsBus[id](data);
    // }
})

const genComponent = (tpl, data, events) => {
    const html = renderHTML(tpl, data);
    const container = document.createElement('div');
    container.innerHTML = html;
    const nodes = container.getElementsByTagName("*");
    for (let i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].onclick) {
            const eventHandler = nodes[i].getAttribute("onclick");
            console.log(eventHandler)
            const eventNameAndParams = eventHandler.split("(");// TODO 参数变为string...
            const methodName = eventNameAndParams[0];
            const params = eventNameAndParams[1] ? eventNameAndParams[1].replace(")", "").split(",") : null;
            console.log(params)
            Object.keys(events).forEach(key => {
                if (key === methodName) {
                    // TODO id不存在的情况，添加唯一标示
                    eventsBus[nodes[i].id] = function () {
                        events[key](...params);
                    };
                }
            })
            nodes[i].removeAttribute("onclick");
        }
    }

    return container.innerHTML;
}

export default genComponent