/**
 * Created by wb-xiongsongsong on 14-2-26.
 */
var express = require('express');
var app = express();
var path = require('path')
app.use(express.static(path.join(__dirname)))
app.use(express.bodyParser({}));

app.post('*', function (req, res) {
    console.log(req.body)
    res.json(req.body)
})

app.listen(80);