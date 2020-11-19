import genComponent from '../../../../framework/genComponent';
import tpl from './dom.html';
import Li from '../item/script'

const List = (props) => {
    const data = {
        list: props.data, // 或者AJAX获取
        child: function (item) {
            return Li({ data: item });
        }
    }
    const events = {
        onItemClick: function () {
            // TODO 局部更新
            // TODO reReader Virtual dom diff
        }
    };

    const component = genComponent(tpl, data, events);
    return component;
}

export default List;