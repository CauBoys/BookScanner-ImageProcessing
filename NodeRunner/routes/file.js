const express = require('express');
const fs = require('fs');
const config = require('../config');
const router = express.Router();

router.get('/download/:uuid', (req, res, next) => {
    var uuid = req.params.uuid;
    var fileName = config.fileList.imageUpload + uuid + ".jpg";
    fs.readFile(fileName, (err, data) => {
        if(data != undefined) {
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            res.write(data);
            res.end();    
        }
        else {
            res.json({
                result: false
            });
        }
    });
});

module.exports = router;