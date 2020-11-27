const express = require('express');
const config = require('../config');
const fileIO = require('../utils/fileIO');
const router = express.Router();

router.get('/isFinish/:uuid', (req, res, next) => {
    // 해당 파일이 있으면 작업이 끝난 것.
    var uuid = req.params.uuid;
    fs.stat(config.fileList.imageUpload + uuid + ".jpg", function(err) {
        if (!err) { res.json({result : true}) }
        else { res.json({result : false}) }
    });
});

router.get('/findIsFinish/:baseName', (req, res, next) => {
    // find 작업은 이런식으로 작업이 끝났는지 물어봐야함.
    var uuid = req.params.baseName;
    fileIO.jobEndSearcher(baseName)
    .then((result) => {
        if(result.end) {
            res.json({
                result: true, 
                files: result.files
            });
        }
        else {
            res.json({result: false});
        }
    })
    .catch((err) => {
        console.log(err);
        res.json({result: false});
    })
});

router.get('/download/:uuid', (req, res, next) => {
    var uuid = req.params.uuid;
    var fileName = config.fileList.imageUpload + uuid + ".jpg";4
    // TODO : Send Image Code.
});

module.exports = router;