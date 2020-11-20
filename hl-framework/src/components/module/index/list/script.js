import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import Li from '../item/script'

const List = (props) => {
    const data = {
        list: props.data,
        child: function (item) {
            return Li({ data: item });
        }
    }

    const component = createComponent(tpl, data);
    return component;
}

export default List;