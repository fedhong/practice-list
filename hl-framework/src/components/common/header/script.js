import genComponent from '../../../framework/genComponent';
import tpl from './dom.html';

const Header = (props) => {
    const data = props.data;

    const component = genComponent(tpl, data);
    return component;
}

export default Header;