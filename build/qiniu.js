const readline = require('readline');
const colors = require('colors');
const FS = require('fs');
const Join = require('path').join; // 路径片段连接到一起，并规范化生成的路径
const QiNiu = require('qiniu');

const accessKey = 'GvyPnYmgRQ9wn_Jh2Xt_C8JWyawjD65MVVCXgAz8'; // 七牛秘钥
const secretKey = '88aQaNLylG8d5bCrxYD8v8FQChSV3M5EvgKMdDav'; // 七牛秘钥
const bucket = 'barebear'; // 七牛空间名（筒名）
const prefix = 'sharegood-bookmark/'; // 七牛目录名称（前缀）
const limit = 10; // 分页请求 每页数量
var uploadNore = ['index.html']; // 忽略文件数组（可以为文件或文件夹）忽略文件数组（可以为文件或文件夹）

// 鉴权对象
const mac = new QiNiu.auth.digest.Mac(accessKey, secretKey);
// 获取七牛配置
const config = new QiNiu.conf.Config();
// 是否使用https域名
// config.useHttpsDomain = true;
// 上传是否使用cdn加速
// config.useCdnDomain = true;
// 空间对应的机房 Zone_z0(华东)
//config.zone = QiNiu.zone.Zone_z0;
// 资源管理相关的操作首先要构建BucketManager对象
const bucketManager = new QiNiu.rs.BucketManager(mac, config);
// 相关颜色配置 console颜色主题
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
//

// 这里采用异步方法操作 获取远程列表的目的只是为了删除 但只能是获取到列表后 回调里再删除
// 获取远程七牛 指定前缀 文件列表
async function getQiniuList() {
    var options = {
        limit: limit,
        prefix: prefix
    };
    var array = [];
    var list = await getList();
    // marker 上一次列举返回的位置标记，作为本次列举的起点信息
    async function getList(mark = false) {
        if (mark) {
            var options = {
                limit: options.limit,
                prefix: options.prefix,
                mark: mark
            };
        }
        return new Promise(function(resolve, reject) {
            bucketManager.listPrefix(bucket, options, function(
                err,
                respBody,
                respInfo
            ) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (respInfo.statusCode == 200) {
                    //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，指定options里面的marker为这个值
                    var nextMarker = respBody.marker;
                    var commonPrefixes = respBody.commonPrefixes;
                    var items = respBody.items;
                    items.forEach(function(item) {
                        array.push(QiNiu.rs.deleteOp(bucket, item.key));
                    });
                    if (respBody.marker) {
                        getList(respBody.marker);
                    } else {
                        resolve(array);
                    }
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            });
        });
    }
    return list;
}

// 批量删除远程七牛 指定列表 所有文件
async function delAll() {
    async function delQiniuAll() {
        return new Promise(function(resolve, reject) {
            // 获取七牛远程列表数据
            getQiniuList().then(res => {
                if (res.length !== 0) {
                    console.log('远程列表为空'.debug);
                    del(res, resolve);
                } else {
                    resolve();
                }
            });
        });
    }
    await delQiniuAll();
}

function del(deleteOperations, resolve) {
    bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
        if (err) {
            console.log(err);
            //throw err;
        } else {
            // 200 is success, 298 is part success
            if (parseInt(respInfo.statusCode / 100) == 2) {
                respBody.forEach(function(item, index) {
                    if (item.code == 200) {
                        resolve(index);
                        console.log(
                            '删除成功' +
                                '第' +
                                (parseInt(index) + 1) +
                                '个文件'.info
                        );
                    } else {
                        console.log('删除失败'.error);
                        console.log(item.code + '\t' + item.data.error.error);
                        resolve(index);
                    }
                });
            } else {
                console.log(respInfo.deleteusCode);
                console.log(respBody);
            }
        }
    });
}

// 上传所有文件到骑牛
function upAllToQiniu() {
    console.log('开时删除七牛远程资源列表'.debug);
    // 先删除所有 再上传
    delAll().then(res => {
        console.log('开时上传资源到七牛'.debug);
        var files = FS.readdirSync('dist/'); // 文件目录
        var localFile = findSync('dist/');
        // key 为远程 七牛目录文件名
        // localFile[key] 为本地完成路径+文件名称
        for (var key in localFile) {
            upOneToQiniu(localFile[key], key);
        }
    });
}

// 上传单文件到骑牛 localFile为本地完成路径+文件名称 key为远程 七牛目录文件名
function upOneToQiniu(localFile, key) {
    var mac = new QiNiu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: bucket
    };
    var putPolicy = new QiNiu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    var formUploader = new QiNiu.form_up.FormUploader(config);
    var putExtra = new QiNiu.form_up.PutExtra();
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(
        respErr,
        respBody,
        respInfo
    ) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(localFile.info + '=>' + respBody.key.info + '上传成功');
        } else {
            console.log('上传失败' + respInfo.statusCode.error);
            console.log('上传失败' + respBody.error);
        }
    });
}
// 拿到文件 目录路径 startPath 根目录名称
function findSync(startPath) {
    let targetObj = {};

    function finder(path) {
        // 获取当前目录下的 文件或文件夹
        let files = FS.readdirSync(path);
        // 循环获 当前目录下的所有文件
        files.forEach((val, index) => {
            let fPath = Join(path, val);
            let stats = FS.statSync(fPath);
            if (stats.isDirectory()) {
                finder(fPath);
            }
            if (stats.isFile() && isNore(fPath)) {
                targetObj[fPath.replace(startPath, prefix)] = fPath;
            }
        });
    }
    finder(startPath);
    return targetObj;
}
/**
 * 判断当前路径是否在忽略文件数组中
 * @param {String} path 路径
 */
function isNore(path) {
    for (var item of uploadNore) {
        // 遍历忽略数组
        if (path.indexOf(item) !== -1) {
            return false;
        }
    }
    return true;
}

// process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程 因为是全局变量，所以无需使用 require()。
// var rl = readline.createInterface({
//     input: process.stdin, // 要监听的可读流
//     output: process.stdout, // 要写入逐行读取数据的可写流
//     prompt: '是否进行远程部署> (Y/N)'.warn
// });
// rl.prompt();
// // 每当 input 流接收到接收行结束符（\n、\r 或 \r\n）时触发 'line' 事件。 通常发生在用户按下 <Enter> 键或 <Return> 键。监听器函数被调用时会带上一个包含接收的那一行输入的字符串。
// rl.on('line', line => {
//     switch (line.trim()) {
//         case 'y':
//         case 'Y':
//             console.log('开始执行远程部署'.help);
//             // 上传
//             upAllToQiniu();
//             rl.close();
//             break;
//         case 'n':
//         case 'N':
//             console.log('您取消了远程部署'.help);
//             rl.close();
//             break;
//         default:
//             console.log(
//                 `你输入的：'${line.trim()}'为无效命令，请重新输入`.warn
//             );
//             rl.prompt();
//             break;
//     }
// });

var files = FS.readdirSync('dist/'); // 文件目录
var localFile = findSync('dist/');
// key 为远程 七牛目录文件名
// localFile[key] 为本地完成路径+文件名称
for (var key in localFile) {
    // console.log(localFile[key], key);
    upOneToQiniu(localFile[key], key);
}
// upOneToQiniu(
//     'dist/img/share.1d47abfa.png',
//     'sharegood-bookmark/img/share.1d47abfa.png'
// );
