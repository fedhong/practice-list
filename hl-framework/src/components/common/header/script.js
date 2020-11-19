import genComponent from '../../../framework/genComponent';
import tpl from './dom.html';

const Header = (props) => {    
    const data = props.data; // 或者AJAX获取
    const events = {};

    const component = genComponent(tpl, data, events);
    return component;
}

export default Header;

// Dom事件绑定？
// 异步数据获取, 如何使用组件？
// 生命周期？
// props（数据、event）