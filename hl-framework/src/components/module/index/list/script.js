import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import Li from '../item/script'
import style from './style.less';

const List = (props) => {
    const data = {
        list: props.data,
        child: function (item) {
            return Li({ data: item });
        }
    }

    const component = createComponent(tpl, { data, style });
    return component;
}

export default List;