/**
 * Created by wb-xiongsongsong on 14-2-26.
 */

var http = require('http');
var fs = require('fs')
var path = require('path')

var mimeMap = {
    'jpg': 'image/jpg',
    'gif': 'image/gif',
    'css': 'text/css',
    'js': 'application/javascript',
    'html': 'text/html'
}

http.createServer(function (req, res) {
    var fileName = req.url.replace(/\?.*$/, '')

    if (fileName === '/') {
        fileName = './index.html'
    } else {
        fileName = path.join(__dirname, decodeURIComponent(fileName))
    }

    var extName = path.extname(fileName).substring(1)
    res.writeHead(200, {'Content-Type': mimeMap[extName.toLowerCase()] ? mimeMap[extName.toLowerCase()] : 'object/stream'});

    fs.lstat(fileName, function (err, stat) {
        if (err) {
            res.end()
            return
        }
        if (stat.isFile()) {
            fs.createReadStream(fileName).pipe(res);
        } else {
            res.end()
        }

    })

}).listen(80);
