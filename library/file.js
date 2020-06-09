const scope = require('./scope');
const isString = require('./isString');
const isDefined = require('./isDefined');
const loop = require('./loop');
const merge = require('./merge');
const assert = require('./assert');
const assertIsEqual = require('./assertIsEqual');

const fs = require('fs');
const path = require('path');

module.exports = {
    readFile,
    getFiles,
    appendFileLine,
    copyFiles,
    deleteDirectory,
    getPackageVersion,
    bumpPackageVersion,
}

function assertFileExists(filePath) {
    scope(assertFileExists.name, x => {
        merge(x,{f: filePath});
        assert(() => fs.existsSync(filePath))
    });
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

function copyFiles(fromDirectory, toDirectory) {
    scope(copyFiles.name, context => {
        const fileNames = fs.readdirSync(fromDirectory);
    
        // Create the directory if it doesn't exist.
        if (!fs.existsSync(toDirectory)) {
            fs.mkdirSync(toDirectory);
        }

        loop(fileNames, fileName => {
            let src = path.join(fromDirectory, fileName);
            let dest = path.join(toDirectory, fileName);
            fs.copyFileSync(src, dest);
        });
    })
}

function deleteDirectory(directory) {
    scope(deleteDirectory.name, x => {
        merge(x, {directory});
        
        const fileNames = fs.readdirSync(directory);

        loop(fileNames, fileName => {
            let p = path.join(directory, fileName);
            fs.unlinkSync(p);
        });

        fs.rmdirSync(directory);
    });
}

const packageJson = 'package.json';

function getPackageVersion(packageDirectory) {
    let version;
    scope(getPackageVersion.name, x => {
        assert(() => isString(packageDirectory));
        let packagePath = path.join(packageDirectory, packageJson);

        let package = require(packagePath);

        version = package.version;
        merge(x, {version});
        assert(() => isDefined(version));
    })
    return version;
}

function bumpPackageVersion(packageDirectory) {
    let result;
    let log = false;
    scope(bumpPackageVersion.name, x => {
        assert(() => isString(packageDirectory));
        let version = getPackageVersion(packageDirectory);
        merge(x, {version});

        let parts = version.split('.');
        assertIsEqual(() => parts.length, 3);

        let build = parseInt(parts[2]);
        let nextBuild = build + 1;

        parts[2] = nextBuild;

        let nextVersion = parts.join('.');

        let packagePath = path.join(packageDirectory, packageJson);

        let package = require(packagePath);
        package.version = nextVersion;

        let json = JSON.stringify(package, null, 2);
        fs.writeFileSync(packagePath, json);
        if (log) console.log(`Updated version to ${nextVersion} in ` + packagePath);

        result = nextVersion;
    });
    return result;
}