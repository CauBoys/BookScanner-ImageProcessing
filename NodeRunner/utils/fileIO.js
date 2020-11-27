const fs = require('fs');
const config = require('../config');

function jobAttacher(imageFile, func, uuid) {
    return new Promise((res, rej) => {
        fs.readFile(config.fileList.imageRunQueue, (err, data) => {
            if(err) rej();
            else {
                var runQueue = JSON.parse(data);
                runQueue.runQueue.push({
                    func: func,
                    imageFile: imageFile,
                    uuid: uuid
                });
                fs.writeFile(config.fileList.imageRunQueue, JSON.stringify(runQueue), () => {});
                res();
            }
        })
    });
}

function jobEndSearcher(baseName) {
    // baseName 은 / 맨 마지막에 있는 ~.jpg.
    return new Promise((res, rej) => {
        fs.readFile(config.fileList.imageEndQueue, (err, data) => {
            if(err) rej();
            else {
                var endQueue = JSON.parse(data);
                for(var i = 0; i < endQueue.length; i++) {
                    if(endQueue[i].baseName == baseName && endQueue[i].func == "find") {
                        res({
                            end: true,
                            files: endQueue[i].result
                        });
                    }
                }
                res({end: false});
            }
        })
    });
}

function jobEndClear(baseName) {
    fs.readFile(config.fileList.imageEndQueue, (err, data) => {
        if(err) rej();
        else {
            var endQueue = JSON.parse(data);
            var saveQueue = [];
            for(var i = 0; i < endQueue.length; i++) {
                if(!(endQueue[i].baseName == baseName && endQueue[i].func == "find")) {
                    saveQueue.push(endQueue[i]);
                }
            }
            fs.writeFile(config.fileList.imageEndQueue, JSON.stringify({endQUeue : saveQUeue}), () => {} );
        }
    })
}

module.exports = { jobAttacher, jobEndSearcher, jobEndClear };