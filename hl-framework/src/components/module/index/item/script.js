import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import style from './style.less';
console.log(style)

const Li = (props) => {
    const data = props.data;
    const events = {
        onItemClick: function (e, id, name, obj) {
            console.log(id + ',' + name);
            console.log(JSON.stringify(obj))
            //Dom局部更新
            data.name = 'click here';
            const component = createComponent(tpl, { data, style }, events);

            //reRender
            e.target.outerHTML = component;
        }
    };

    const component = createComponent(tpl, { data, style }, events);    
    return component;
}

export default Li;