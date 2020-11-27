const express = require('express');
const fs = require('fs');
const router = express.Router();
const fileIO = require('../utils/fileIO');

router.post('/cut', (req, res, next) => {
    var uuid = getUUID();
    var imageFile = req.body.imageFile; // TODO : Change real image name.
    fileIO.jobAttacher(imageFile, "cut", uuid)
    .then(() => {
        res.json({
            result: true,
            uuid: uuid
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            result: false
        });
    });
});

router.post('/find', (req, res, next) => {
    var uuid = getUUID();
    var imageFile = req.body.imageFile; // TODO : Change real image name.
    fileIO.jobAttacher(imageFile, "find", uuid)
    .then(() => {
        res.json({
            result: true,
            uuid: uuid
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            result: false
        });
    });
});

router.post('/contrast', (req, res, next) => {
    var imageFile = req.body.imageFile; // TODO : Change real image name.
    fileIO.jobAttacher(imageFile, "contrast", uuid)
    .then(() => {
        res.json({
            result: true,
            uuid: uuid
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            result: false
        });
    });
});

router.post('/blur', (req, res, next) => {
    var imageFile = req.body.imageFile; // TODO : Change real image name.
    fileIO.jobAttacher(imageFile, "blur", uuid)
    .then(() => {
        res.json({
            result: true,
            uuid: uuid
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            result: false
        });
    });
});

router.post('/add', (req, res, next) => {
    var imageFile = req.body.imageFile; // TODO : Change real image name.
    fileIO.jobAttacher(imageFile, "add", uuid)
    .then(() => {
        res.json({
            result: true,
            uuid: uuid
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            result: false
        });
    });
});

function getUUID() {
    return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


module.exports = router;