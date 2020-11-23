import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';

const Li = (props) => {
    const data = props.data;
    const events = {
        onItemClick: function (id, name, obj) {
            // TODO Dom局部更新 || reRender?
            alert(id + ',' + name);
            alert(JSON.stringify(obj))
        }
    };

    const component = createComponent(tpl, data, events);
    return component;
}

export default Li;