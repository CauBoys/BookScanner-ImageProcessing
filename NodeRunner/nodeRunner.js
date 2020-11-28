const { exec } = require('child_process');
const fs = require('fs');
const config = require('./config');

function runShell(shellScript) {
	return new Promise((res, rej) => {
		exec(shellScript, (err, stdout, stderr) => {
			if(err) {
				rej(err);
			}
			else {
				res(stdout);
			}
		});
	});
}

function addWaterMark(sourceFile, uuid) {
    return new Promise((res, rej) => {
        var saveFile = config.fileList.imageUpload + uuid + '.jpg';
        runShell('sh imageAdd.sh ' + sourceFile + " " + saveFile).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageContrast(sourceFile, uuid) {
    var saveFile = config.fileList.imageUpload + uuid + '.jpg';
    return new Promise((res, rej) => {
        runShell('sh imageContrast.sh ' + sourceFile + " " + saveFile).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

// 사람이 올린 사진에서 종이부분을 찾는것.
function paperDetect(sourceFile, uuid) {
    var saveFile = config.fileList.imageUpload + uuid + '.jpg';
    return new Promise((res, rej) => {
        runShell('sh paperDetect.sh ' + sourceFile + " " + saveFile).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

// 종이부분에서 사진 List를 찾는것.
function imageDetect(sourceFile) {
    return new Promise((res, rej) => {
        runShell('sh imageDetect.sh ' + sourceFile).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageBlur(sourceFile, uuid, startX, startY, endX, endY, backX, backY) {
    return new Promise((res, rej) => {
        runShell('sh imageBlur.sh ' + sourceFile + " " + String(startX) + " " + String(startY) + " " + String(endX) + " " + String(endY) + " " + String(backX) + " " + String(backY) + " ").
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

module.exports = { addWaterMark, imageContrast, paperDetect, imageDetect, imageBlur }