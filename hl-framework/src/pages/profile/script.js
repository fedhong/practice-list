import createComponent from '../../framework/createComponent';
import Header from '../../components/common/header/script';
import Footer from '../../components/common/footer/script';
import tpl from './dom.html';
import style from './style.less';

const header = Header({ data: { name: 'Fedhong' } });
const footer = Footer();

const profile = (props) => {
    const data = {
        header,
        footer
    };
    const events = {};
    const component = createComponent(tpl, { data, style }, events);

    return component;
}

export default profile;