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

module.exports = { addWaterMark, imageContrast };