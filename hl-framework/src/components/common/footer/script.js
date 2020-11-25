import createComponent from '../../../framework/createComponent';
import tpl from './dom.html';
import style from './style.less';

const Footer = (props) => {
    const data = {};

    const component = createComponent(tpl, { data, style });
    return component;
}

export default Footer;