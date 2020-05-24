const {
    isDefined,
    isString,
    isUndefined,
} = require('./core');

const {
    scope,
    merge,
} = require('./log');

const {
    assert,
    assertFileExists,
    assertIsEqual,
} = require('./assert');

const {
    loop,
} = require('./tools');

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
    scope(deleteDirectory.name, context => {
        const fileNames = fs.readdirSync(directory);

        loop(fileNames, fileName => {
            let p = path.join(directory, fileName);
            fs.unlinkSync(p);
        });

        fs.rmdirSync(directory);
    });
}


function getPackageVersion(packagePath) {
    let version;
    scope(getPackageVersion.name, x => {
        if (isUndefined(packagePath)) {
            packagePath = './package.json';
        }
        let package = require(packagePath);

        version = package.version;
        merge(x, {version});
        assert(() => isDefined(version));
    })
    return version;
}

function bumpPackageVersion(packagePath) {
    scope(bumpPackageVersion.name, x => {
        if (isUndefined(packagePath)) {
            packagePath = './package.json';
        }

        let version = getPackageVersion(packagePath);
        merge(x, {version});

        let parts = version.split('.');
        assertIsEqual(() => parts.length, 3);

        let build = parseInt(parts[2]);
        let nextBuild = build + 1;

        parts[2] = nextBuild;

        let nextVersion = parts.join('.');

        let package = require(packagePath);
        package.version = nextVersion;

        let json = JSON.stringify(package, null, 2);
        fs.writeFileSync(packagePath, json);
    })
}