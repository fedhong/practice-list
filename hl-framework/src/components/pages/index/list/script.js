import importTpl from '../../../../framework/importTpl';
import genComponent from '../../../../framework/genComponent';
import tpl from './dom.html';

const List = (props) => {
    const data = props.data; // 或者AJAX获取
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