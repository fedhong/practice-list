import genComponent from '../../../../framework/genComponent';
import tpl from './dom.html';

const Li = (props) => {
    const data = props.data;
    const events = {
        onItemClick: function (obj) {
            console.log(obj);
            obj = JSON.parse(obj);
            alert(obj.id + ',' + obj.name);
        }
    };

    const component = genComponent(tpl, data, events);
    return component;
}

export default Li;