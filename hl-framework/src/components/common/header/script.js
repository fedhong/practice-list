import createComponent from '../../../framework/createComponent';
import tpl from './dom.html';

const Header = (props) => {
    const data = props.data;

    const component = createComponent(tpl, { data });
    return component;
}

export default Header;