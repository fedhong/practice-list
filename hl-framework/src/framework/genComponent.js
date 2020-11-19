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
    // TODO 根据唯一标识，判断冒泡目标
    // if (id == 1) {
    //     const de = e.target.attributes['data-event'];
    //     const data = de ? de.value : null;
    //     eventsBus[id](data);
    // }
})

const genComponent = (tpl, data, events) => {
    const html = renderHTML(tpl, data);
    // TODO 解析html，删除onXXX，添加唯一标识
    // console.log('html', html);
    // if (Object.keys(events).length > 0) {
    //     for (let e in events) {
    //         eventsBus['1'] = events[e];
    //     }
    // }
    return html;
}

export default genComponent