import createComponent from '../../../framework/createComponent';
import tpl from './dom.html';

const Footer = (props) => {
    const data = {};

    const component = createComponent(tpl, data);
    return component;
}

export default Footer;