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

module.exports = { jobAttacher };