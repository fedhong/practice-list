const build = require('./build');
const deploy = require('./deploy');

!(async () => {
    console.time('use time');
    console.log('---------------> begin');
    await build();
    await deploy();
    console.log('---------------> end');
    console.timeEnd('use time');
})();