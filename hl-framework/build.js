const rollup = require('rollup');

const path = require('path');
const html = require('rollup-plugin-html');
const html2 = require('rollup-plugin-html2');
const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const pxtovw = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');
const dev = require('rollup-plugin-dev');

const env = process.env.ENV;

const config = {
    input: path.resolve('src/app.js'),
    output: {
        file: path.resolve('build/bundle.js'),
        format: 'iife'
    },
    watch: {
        exclude: ['node_modules/**']
    },
    plugins: [
        html({
            include: '**/*.html',
        }),
        html2({
            template: path.resolve('public/index.html'),
            externals: [{
                file: 'bundle.css',
                pos: 'before',
            }]
        }),
        terser(),
        postcss({
            //inject: true,
            minimize: true,
            extract: path.resolve('build/bundle.css'),
            modules: true,
            plugins: [autoprefixer, pxtovw({
                viewportWidth: 750, // (Number) The width of the viewport.
                // viewportHeight: 1334, // (Number) The height of the viewport.
                unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                viewportUnit: 'vw', // (String) Expected units.
                selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
            })]
        }),
        copy({
            targets: [
                { src: 'src/assets', dest: 'build' }
            ]
        }),
        {
            name: 'myPlugin',
            moduleParsed(module) {
                // console.log('------------->start myPlugin:');
                // console.log(module.code);
            },
        },
        dev({
            force: true,
            dirs: ['build'],
            host: 'localhost',
            port: 10001,
            proxy: {
                '/act/*': 'http://offsiteact.waimai.st.sankuai.com'
            }
        }),
    ]
};

const inputOptions = {
    input: config.input,
    plugins: config.plugins,

};
const outputOptions = {
    output: config.output,
}
const watchOptions = {
    ...inputOptions,
    ...outputOptions,
    watch: config.watch,
}

async function build() {
    console.log('start build');
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);

    // TODO dev环境watch
    if (env === 'dev') {
        const watcher = rollup.watch(watchOptions);
        watcher.on('event', event => {
            console.log(`watch ${event.code}`);
            // event.code：
            //   START        — 监听器正在启动（重启）
            //   BUNDLE_START — 构建单个文件束
            //   BUNDLE_END   — 完成文件束构建
            //   END          — 完成所有文件束构建
            //   ERROR        — 构建时遇到错误
            //   FATAL        — 遇到无可修复的错误
        });

        // 停止监听
        // watcher.close();
    }
}



/**
 * 
 */

const crypto = require('crypto');
const fs = require('fs');

async function deploy() {


    console.log('start deploy');

    const replaceMap = {};

    const buildPath = './build';
    readDirSync(buildPath);
    console.log(replaceMap);


    function readDirSync(path) {

        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = path + "/" + item;
            const info = fs.statSync(absolutePath)

            if (info.isDirectory()) {
                readDirSync(absolutePath);
            } else {
                //读取一个Buffer
                const buffer = fs.readFileSync(absolutePath);
                const fsHash = crypto.createHash('md5');
                fsHash.update(buffer);
                const md5 = fsHash.digest('hex');
                console.log("文件%s的MD5是：%s", absolutePath, md5);

                replaceMap[item] = `${item}_${md5}`;
            }
        })
    }
}



/**
 * 
 */
!(async () => {
    console.log('1');
    await build();
    await deploy();
    console.log('2');
})();






