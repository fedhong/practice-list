/**
 * 运行时
 */

import renderHTML from './renderHTML';

const genComponent = (tpl, data, events) => {
    //TODO add events
    return renderHTML(tpl, data);
}

export default genComponent