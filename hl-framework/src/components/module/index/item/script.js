import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import './style.scss';

const Li = (props) => {
    const data = props.data;
    const events = {
        onItemClick: function (e, id, name, obj) {// TODO $event传递
            console.log(e);
            console.log(id + ',' + name);
            console.log(JSON.stringify(obj))
            //Dom局部更新
            data.name = 'click here';
            const component = createComponent(tpl, data, events);

            //reRender
            e.target.outerHTML = component;
        }
    };

    const component = createComponent(tpl, data, events);
    return component;
}

export default Li;