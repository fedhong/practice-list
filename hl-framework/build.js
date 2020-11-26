var crypto = require('crypto');
var fs = require('fs');

readDirSync('./build');

function readDirSync(path) {
    var paths = fs.readdirSync(path);
    paths.forEach(function (item, index) {
        var absolutePath = path + "/" + item;
        var info = fs.statSync(absolutePath)

        if (info.isDirectory()) {
            readDirSync(path + "/" + item);
        } else {
            //读取一个Buffer
            var buffer = fs.readFileSync(absolutePath);
            var fsHash = crypto.createHash('md5');
            fsHash.update(buffer);
            var md5 = fsHash.digest('hex');
            console.log("文件%s的MD5是：%s", absolutePath, md5);
        }
    })
}

