var unzips = require('unzip');
/**
 * 解压缩包
 * @param zipPath 压缩包路径
 * @param unzipPath 解压路径
 * @param callback 回调
 */
function unzip(zipPath, unzipPath, callback) {
    callback = callback ? callback : function () {
    };
    //判断是否存在压缩包
    fs.exists(zipPath, function (exists) {
        if (!exists) return callback('zipPath is not esists', null);
        //以流的方式进行解压缩
        var unzipExtractor = unzips.Extract({ path: unzipPath });
        //添加错误监听事件
        unzipExtractor.on('error', function (err) {
            callback(err, null);
        });
        //添加完成监听事件
        unzipExtractor.on('close', function () {
            callback(null, 'ok');
        });
        fs.createReadStream(zipPath)
            .on('error', function (err) {
            callback(err, null);
        })
            .pipe(unzipExtractor);
    });
}