const rollup = require('rollup');

const path = require('path');
const cleaner = require('rollup-plugin-cleaner');
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
        cleaner({
            targets: [
                './build/'
            ]
        }),
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
        // terser(),
        postcss({
            //inject: true,
            // minimize: true,
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
        env === 'dev' && dev({
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

    // dev环境watch
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

const uploadEnv = 'dev';
const cdnURL = `//www.baidu.com/static/${uploadEnv}`;

const _upload = (filePath) => {
    //TODO 上传文件

}

const _md5 = (filePath) => {
    const buffer = fs.readFileSync(filePath);
    const fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    const md5 = fsHash.digest('hex');
    return md5;
}


async function deploy() {

    console.log('start deploy');

    // 1、对静态资源文件进行MD5并上传CDN
    const assetMap = {};
    const assetPath = './build/assets';
    (function md5Assets(path) {
        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = `${path}/${item}`;
            const info = fs.statSync(absolutePath)

            if (info.isDirectory()) {
                md5Assets(absolutePath);
            } else {
                const md5 = _md5(absolutePath);
                const newName = item.replace(/\./, `_${md5}.`);
                assetMap[item] = newName;

                //md5后的文件名
                const md5FilePath = `${path}/${newName}`;
                //rename                
                fs.renameSync(absolutePath, md5FilePath);
                //上传CDN
                _upload(md5FilePath);
            }
        })
    })(assetPath);
    console.log(assetMap);

    // 2、替换css、js文件中，对静态资源的引用
    const cssAndJsPath = './build/';
    (function replaceCssAndJs(path) {
        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = `${path}/${item}`;
            const info = fs.statSync(absolutePath)

            if (!info.isDirectory() && (item.endsWith('.css') || item.endsWith('.js'))) {
                let file = fs.readFileSync(absolutePath, 'utf-8');
                Object.keys(assetMap).forEach(key => {
                    const reg = new RegExp(`assets\\/[\\w\\-\\/]*${key}`, 'g');
                    file = file.replace(reg, `${cdnURL}/${key.substring(key.lastIndexOf('.') + 1)}/${assetMap[key]}`);
                });
                fs.writeFileSync(absolutePath, file, 'utf-8');
            }
        })
    })(cssAndJsPath);


    // 3、对css文件和js文件进行MD5并上传CDN
    const cssMap = {};
    const jsMap = {};
    const buildPath = './build';
    (function md5CssAndJs(path) {
        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = `${path}/${item}`;
            const info = fs.statSync(absolutePath)

            if (!info.isDirectory()) {
                const md5 = _md5(absolutePath);
                const newName = item.replace(/\./, `_${md5}.`);
                const md5FilePath = `${path}/${newName}`;
                newName.endsWith('.css') && (cssMap[item] = newName, fs.renameSync(absolutePath, md5FilePath), _upload(md5FilePath));
                newName.endsWith('.js') && (jsMap[item] = newName, fs.renameSync(absolutePath, md5FilePath), _upload(md5FilePath));
            }
        })
    })(buildPath);

    console.log(cssMap);
    console.log(jsMap);

    // 4、替换html文件中，对静态资源、css、js的引用
    const htmlPath = './build/index.html';
    (function replaceHTML(path) {
        let html = fs.readFileSync(path, 'utf-8');
        [assetMap, cssMap, jsMap].forEach(item => {
            Object.keys(item).forEach(key => {
                const reg = new RegExp(`assets\\/[\\w\\-\\/]*${key}`, 'g');
                html = html.replace(reg, `${cdnURL}/${key.substring(key.lastIndexOf('.') + 1)}/${item[key]}`);
                html = html.replace(key, `${cdnURL}/${key.substring(key.lastIndexOf('.') + 1)}/${item[key]}`);
            });
        })
        fs.writeFileSync(path, html, 'utf-8');
    })(htmlPath)
}

/**
 * 
 */
!(async () => {
    console.time('use time');
    console.log('---------------> begin');
    await build();
    await deploy();
    console.log('---------------> end');
    console.timeEnd('use time');
})();