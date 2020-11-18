import importTpl from '../../../framework/importTpl';
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
// 模板的可读性，html高亮、闭合
// 组件导出什么形式（class？）？
// 如何使用组件？

// 生命周期
// props（数据）