const express = require('express');
const config = require('../config');
const router = express.Router();
const fileIO = require('../utils/fileIO');
const nodeRunner = require('../nodeRunner');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: config.fileList.imageUpload,
    filename: function (req, file, next) {
        next(null, "I_" + getUUID() + ".jpg");
    },
});

const upload = multer({
    storage: storage
});

router.post('/cut', upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = req.file.fileName;

    nodeRunner.paperDetect(inputFileName, outputFileName).then((stdout) => {
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/find', upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid;
    var inputFileName = req.file.fileName;
    
    nodeRunner.imageDetect(inputFileName, outputFileName).then((stdout) => {
        var files = stdout.split("\n");
        // files 에 jpg 빼고 보내자.
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/contrast',  upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = req.file.fileName;

    nodeRunner.imageContrast(inputFileName, outputFileName).then((stdout) => {
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/blur',  upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = req.file.fileName;
    var coord = [req.body.startX, req.body.startY, req.body.endX, req.body.endY, req.body.backX, req.body.backY]

    nodeRunner.imageBlur(inputFileName, outputFileName, coord[0], coord[1], coord[2], coord[3], coord[4], coord[5]).then((stdout) => {
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/add',  upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = req.file.fileName;

    nodeRunner.addWaterMark(inputFileName, outputFileName).then((stdout) => {
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

function getUUID() {
    return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


module.exports = router;