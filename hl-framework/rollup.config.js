import html from 'rollup-plugin-html';
import html2 from 'rollup-plugin-html2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import serve from 'rollup-plugin-serve';
import path from 'path';

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
            plugins: [autoprefixer]
        }),
        {
            name: 'myPlugin',
            moduleParsed(module) {
                // console.log('------------->start myPlugin:');
                // console.log(module.code);
            },
        },
        serve({
            open: false,// Launch in browser (default: false)
            verbose: true,// Show server address in console (default: true)
            contentBase: ['build'],// Multiple folders to serve from
            host: 'localhost',
            port: 10001,
            proxy: {
                api: 'http://localhost:8181'
            },
        }),
    ]
};