import html from 'rollup-plugin-html';
import html2 from 'rollup-plugin-html2';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import serve from 'rollup-plugin-serve';

export default {
    input: 'src/app.js',
    output: {
        file: 'build/bundle.js',
        format: 'iife'
    },
    plugins: [
        html({
            include: '**/*.html',
            htmlMinifierOptions: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                conservativeCollapse: true,
                minifyJS: true
            }
        }),
        html2({
            template: './public/index.html',
        }),
        sass({
            output: 'build/bundle.css',
            insert: false,
            processor: css => postcss([autoprefixer])
                .process(css)
                .then(result => result.css)
        }),
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