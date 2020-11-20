import createComponent from '../../framework/createComponent';
import Header from '../../components/common/header/script';
import List from '../../components/module/index/list/script'
import tpl from './dom.html';

const header = Header({ data: { name: 'Fedhong' } });
// TODO AJAX获取
const list = List({ data: [{ id: 1, name: 'AAAAAAA' }, { id: 2, name: 'BBBBBBBB' }, { id: 3, name: 'CCCCCCCC' }] });

const Index = (props) => {
    const data = {
        header,
        list
    };

    const component = createComponent(tpl, data);

    return component;
}

export default Index();