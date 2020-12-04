const express = require('express');
const config = require('../config');
const router = express.Router();
const nodeRunner = require('../runner/nodeRunner');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: config.fileList.imageUpload,
    filename: function (req, file, next) {
        next(null, "I_" + getUUID() + ".jpg");
    },
});

const upload = multer({ storage: storage });

router.post('/cut', upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = config.fileList.imageUpload + req.file.filename;

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
    var inputFileName = config.fileList.imageUpload + req.file.filename;
    
    nodeRunner.imageDetect(inputFileName, outputFileName).then((stdout) => {
        var files = stdout.split("\n");
        var retFiles = [];
        for(var i = 0; i < files.length; i++) {
            if(files[i].length > 0) retFiles.push(uuid + "_" + String(i));
        }
        res.json({
            result: true,
            fileName: retFiles
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/cutAndFind', upload.single("img"), (req, res, next) => {
    var uuid1 = getUUID();
    var uuid2 = getUUID();
    var outputFileName1 = config.fileList.imageUpload + uuid1 + ".jpg";
    var outputFileName2 = config.fileList.imageUpload + uuid2;
    var inputFileName = config.fileList.imageUpload + req.file.filename;

    nodeRunner.paperDetect(inputFileName, outputFileName1)
    .then((stdout) => {
        // Detecting Paper.
        nodeRunner.imageDetect(outputFileName1, outputFileName2).then((stdout) => {
            var files = stdout.split("\n");
            var retFiles = [];
            for(var i = 0; i < files.length; i++) {
                if(files[i].length > 0) retFiles.push(uuid2 + "_" + String(i));
            }
            res.json({
                result: true,
                cutFileName: uuid1,
                subFileName: retFiles
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({ result: false });
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({ result: false });
    });
});

router.post('/cutAndAdd', upload.single("img"), (req, res, next) => {
    var uuid1 = getUUID();
    var uuid2 = getUUID();
    var outputFileName1 = config.fileList.imageUpload + uuid1 + ".jpg";
    var outputFileName2 = config.fileList.imageUpload + uuid2 + ".jpg";
    var inputFileName = config.fileList.imageUpload + req.file.filename;

    nodeRunner.paperDetect(inputFileName, outputFileName1)
    .then((stdout) => {
        // Detecting Paper.
        nodeRunner.addWaterMark(outputFileName1, outputFileName2).then((stdout) => {
            res.json({
                result: true,
                fileName: uuid2
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({ result: false });
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({ result: false });
    });
});

router.post('/contrast',  upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var value = req.body.value;
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = config.fileList.imageUpload + req.file.filename;

    nodeRunner.imageContrast(inputFileName, outputFileName, value).then((stdout) => {
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
    var value = req.body.value;
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = config.fileList.imageUpload + req.file.filename;
    var coord = [req.body.startX, req.body.startY, req.body.endX, req.body.endY];

    nodeRunner.imageBlur(inputFileName, outputFileName, coord[0], coord[1], coord[2], coord[3], value).then((stdout) => {
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/mosiac',  upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var value = req.body.value;
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = config.fileList.imageUpload + req.file.filename;
    var coord = [req.body.startX, req.body.startY, req.body.endX, req.body.endY];

    nodeRunner.imageMosiac(inputFileName, outputFileName, coord[0], coord[1], coord[2], coord[3], value).then((stdout) => {
        res.json({
            result: true,
            fileName: uuid
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/deletion',  upload.single("img"), (req, res, next) => {
    var uuid = getUUID();
    var outputFileName = config.fileList.imageUpload + uuid + ".jpg";
    var inputFileName = config.fileList.imageUpload + req.file.filename;
    var coord = [req.body.startX, req.body.startY, req.body.endX, req.body.endY, req.body.backX, req.body.backY]

    nodeRunner.imageDeletion(inputFileName, outputFileName, coord[0], coord[1], coord[2], coord[3], coord[4], coord[5]).then((stdout) => {
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
    var inputFileName = config.fileList.imageUpload + req.file.filename;

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