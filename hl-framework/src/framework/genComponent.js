/**
 * 运行时
 */
import renderHTML from './renderHTML';

const eventsBus = {};

document.addEventListener("click", function (e) {
    const id = e.target.id;
    if (id == 1) {// TODO 判断冒泡目标
        const de = e.target.attributes['data-event'];
        const data = de ? de.value : null;
        eventsBus[id](data);
    }
})

const genComponent = (tpl, data, events) => {
    if (Object.keys(events).length > 0) {
        for (let e in events) {
            eventsBus['1'] = events[e];// TODO 获取唯一标识
        }
    }
    return renderHTML(tpl, data);
}

export default genComponent