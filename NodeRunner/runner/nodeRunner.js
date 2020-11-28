const { exec } = require('child_process');
const fs = require('fs');
const config = require('../config');

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
        runShell('sh runner/imageAdd.sh ' + sourceFile + " " + uuid).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageContrast(sourceFile, uuid, value) {
    return new Promise((res, rej) => {
        runShell('sh runner/imageContrast.sh ' + sourceFile + " " + uuid + " " + value).
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
    return new Promise((res, rej) => {
        runShell('sh runner/paperDetect.sh ' + sourceFile + " " + uuid).
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
        runShell('sh runner/imageDetect.sh ' + sourceFile).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageDeletion(sourceFile, uuid, startX, startY, endX, endY, backX, backY)  {
    return new Promise((res, rej) => {
        runShell('sh runner/imageDeletion.sh ' + sourceFile + " " + uuid  + " " + String(startX) + " " + String(startY) + " " + String(endX) + " " + String(endY) + " " + String(backX) + " " + String(backY) + " ").
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageBlur(sourceFile, uuid, startX, startY, endX, endY, value) {
    return new Promise((res, rej) => {
        runShell('sh runner/imageBlur.sh ' + sourceFile + " " + uuid  + " " + String(startX) + " " + String(startY) + " " + String(endX) + " " + String(endY) + " " + String(value)).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageMosiac(sourceFile, uuid, startX, startY, endX, endY) {
    return new Promise((res, rej) => {
        runShell('sh runner/imageMosiac.sh ' + sourceFile + " " + uuid  + " " + String(startX) + " " + String(startY) + " " + String(endX) + " " + String(endY) + " " + String(value)).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

module.exports = { addWaterMark, imageContrast, paperDetect, imageDetect, imageDeletion, imageBlur, imageMosiac }