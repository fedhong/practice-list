import html from 'rollup-plugin-html';
import html2 from 'rollup-plugin-html2'

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
        })
    ]
};