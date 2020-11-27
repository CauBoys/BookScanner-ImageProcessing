const { exec } = require('child_process');

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

function addWaterMark(sourceFile) {
    return new Promise((res, rej) => {
        runShell('sh imageAdd.sh ' + sourceFile).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function imageContrast(sourceFile, factor) {
    return new Promise((res, rej) => {
        runShell('sh imageContrast.sh ' + sourceFile + " " + factor).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}

function paperDetect(sourceFile) {
    return new Promise((res, rej) => {
        runShell('sh paperDetect.sh ' + sourceFile + " " + factor).
        then((stdout) => {
            res(stdout);
        }).
        catch((err) => {
            rej(err);
        })
    });
}
// 사람이 올린 사진에서 종이부분을 찾는것.

function imageDetect(sourceFile) {
    return new Promise((res, rej) => {
        runShell('sh imageDetect.sh ' + sourceFile).
        then((stdout) => {
            res(stdout);    // printf 로 잘라낸 사진을 저장하고, 그 파일 이름을 출력해야한다.
            // 파일 이름은 bookscannner 어쩌구 폴더에 upload 폴더 하나 만들어서 그 안에 adjust?
            // ~/upload/adjust/uuid_0.jpg -> 원본파일 : ~/upload/xxxx-xxxx-xxxx-xxxx-xxxx.jpg
        }).
        catch((err) => {
            rej(err);
        })
    });
}
// 종이부분에서 사진 List를 찾는것.

function imageBlur(sourceFile, startX, startY, endX, endY, backX, backY) {
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

module.exports = { addWaterMark, imageContrast, paperDetect, imageDetect, imageBlur };