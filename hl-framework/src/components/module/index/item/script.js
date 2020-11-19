import genComponent from '../../../../framework/genComponent';
import tpl from './dom.html';

const Li = (props) => {
    const data = props.data;
    const events = {
        onItemClick: function (id, name) {
            alert(id + ',' + name);
        }
    };

    const component = genComponent(tpl, data, events);
    return component;
}

export default Li;