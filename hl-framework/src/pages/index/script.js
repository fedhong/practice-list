import Header from '../../components/common/header/script';
import List from '../../components/pages/index/list/script'
import tpl from './dom.html';

const header = Header({ data: '张三' });
console.log('header:\n', header);
const list = List({ data: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }] });
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

export default Index;