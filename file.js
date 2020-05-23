const {
    scope,
    merge,
} = require('./log');

const {
    isDefined,
    isString,
} = require('./core');

const {
    assert,
    assertFileExists,
} = require('./assert');

const fs = require('fs');

module.exports = {
    readFile,
    getFiles,
    appendFileLine,
}

function readFile(fileName) {
    return scope(readFile.name, context => {
        assertFileExists(fileName);

        merge(context, {fileName});
        let file = fs.readFileSync(fileName, 'utf8');
        return file;
    });
}

function getFiles(directoryName) {
    return scope(getFiles.name, context => {
        assertFileExists(directoryName);

        merge(context, {directoryName});
        let result = fs.readdirSync(directoryName);
        return result;
    });
}

function appendFileLine(file, line) {
    scope(appendFileLine.name, context => {
        assertFileExists(file);
        if (isDefined(line)) {
            assert(() => isString(line));
            if (line.length > 0) {
                fs.appendFileSync(file, line);
            }
        }
        fs.appendFileSync(file, `
`);
    });
}