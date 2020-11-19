import genComponent from '../../framework/genComponent';
import Header from '../../components/common/header/script';
import List from '../../components/module/index/list/script'
import tpl from './dom.html';

const header = Header({ data: { name: 'Fedhong' } });
console.log('header:\n', header);

const list = List({ data: [{ id: 1, name: 'AAAAAAA' }, { id: 2, name: 'BBBBBBBB' }, { id: 3, name: 'CCCCCCCC' }] });
console.log('list:\n', list);

const Index = (props) => {
    const data = {
        header,
        list
    };
    const events = {};

    const component = genComponent(tpl, data, events);

    return component;
}

export default Index();