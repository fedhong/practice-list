import createDiv from './createDiv';

createDiv("div1", "hello world!");

Promise.resolve('Promise:result').then((data) => {
    console.log(data);
})