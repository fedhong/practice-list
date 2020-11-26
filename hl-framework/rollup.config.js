import path from 'path';
import html from 'rollup-plugin-html';
import html2 from 'rollup-plugin-html2';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import pxtovw from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer';
import dev from 'rollup-plugin-dev';

//TODO hash

//TODO upload 

export default {
    input: path.resolve('src/app.js'),
    output: {
        file: path.resolve('build/bundle.js'),
        format: 'iife'
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
        postcss({
            //inject: true,
            //minimize: true,
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
                '/baidu/*': 'http://www.baidu.com/'
            }
        }),
    ]
};