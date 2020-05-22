const {
    logIndent,
    merge,
} = require('./log');

const {
    assertFileExists,
} = require('./assert');

const fs = require('fs');

module.exports = {
    readFile,
    getFiles,
}

function readFile(fileName) {
    return logIndent(readFile.name, context => {
        assertFileExists(fileName);

        merge(context, {fileName});
        let file = fs.readFileSync(fileName, 'utf8');
        return file;
    });
}

function getFiles(directoryName) {
    return logIndent(getFiles.name, context => {
        assertFileExists(directoryName);

        merge(context, {directoryName});
        let result = fs.readdirSync(directoryName);
        return result;
    });
}