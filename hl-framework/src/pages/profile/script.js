import createComponent from '../../framework/createComponent';
import tpl from './dom.html';
import style from './style.less';

const profile = (props) => {
    const data = {};
    const events = {};
    const component = createComponent(tpl, { data, style }, events);

    return component;
}

export default profile;