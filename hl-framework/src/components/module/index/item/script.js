import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';

const Li = (props) => {
    const data = props.data;
    const events = {
        onItemClick: function (id, name) {
            // TODO Dom局部更新
            alert(id + ',' + name);
        }
    };

    const component = createComponent(tpl, data, events);
    return component;
}

export default Li;