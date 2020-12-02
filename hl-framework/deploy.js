const crypto = require('crypto');
const fs = require('fs');

// cdnURL为空时，不使用cdn，资源存放在相对路径
const cdnURL = '';

const _upload = (filePath) => {
    // TODO 上传文件
    // 如果使用CDN，需要实现该方法将静态资源上传
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
                    if (cdnURL) {
                        const reg = new RegExp(`assets\\/[\\w\\-\\/]*${key}`, 'g');
                        file = file.replace(reg, `${cdnURL}/${assetMap[key]}`);
                    } else {
                        file = file.replace(key, assetMap[key]);
                    }
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
                if (cdnURL) {
                    const reg = new RegExp(`assets\\/[\\w\\-\\/]*${key}`, 'g');
                    html = html.replace(reg, `${cdnURL}/${item[key]}`);
                    html = html.replace(key, `${cdnURL}/${item[key]}`);

                } else {
                    html = html.replace(key, item[key]);
                }
            });
        })
        fs.writeFileSync(path, html, 'utf-8');
    })(htmlPath)
}

const args = process.argv.splice(2)
if (require.main === module) {
    if (~args.indexOf('--exec') || ~args.indexOf('-e')) {

        !(async () => {
            console.time('use time');
            console.log('---------------> begin');
            await deploy();
            console.log('---------------> end');
            console.timeEnd('use time');
        })();
    } else {
        console.log('\033[42;30m Warning \033[40;32m If you want run it directly, required --exec.\033[0m')
    }
}
module.exports = deploy;