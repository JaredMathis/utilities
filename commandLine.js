const isString = require('./library/isString');
const scope = require('./library/scope');
const assert = require('./library/assert');
const merge = require('./library/merge');
const isArray = require('./library/isArray');
const isInteger = require('./library/isInteger');
const isUndefined = require('./library/isUndefined');
const loop = require('./library/loop');
const getAwsLambdaLogs = require('./library/getAwsLambdaLogs');
const { deleteDirectory } = require('./file');

const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

let verbose = false;

module.exports = {
    commandLine,
    functionCreate,
    baseDirectory: '.',
    /** Whether or not this is the wlj-utilities NPM package */
    isWljUtilitiesPackage: false
};

const defaultCommands = {
    functionCreate,
    functionTest,
    functionDelete,
    functionRename,
    getAwsLambdaLogs,
}

function commandLine(commands) {
    scope(commandLine.name, x => {
        if (isUndefined(commands)) {
            commands = defaultCommands;
        }

        let command = commands[process.argv[2]];
        if (!command) {
            console.log('Please use a command-line argument.');
            console.log('Valid command-line arguments:');
            loop(Object.keys(commands), c => {
                console.log(c);
            });
            return;
        }

        let remaining = process.argv.slice(3);
        if (verbose) {
            console.log('Calling: ' + command.name);
            console.log('Args: ' + remaining);
        }
        let messages = [];
        command(remaining, messages);
        console.log(messages.join(EOL));
    });
}

const library = 'library';

function getFunctionName(args, messages, i) {
    let result;
    scope(getFunctionName.name, x => {
        merge(x, { args });
        assert(() => isArray(args));
        assert(() => isArray(messages));
        assert(() => isInteger(i));
        assert(() => 0 <= i);

        if (args.length < 1) {
            messages.push('Expecting at least 1 argument');
            return;
        }

        let fnName = args[i];
        assert(() => isString(fnName));
        result = fnName;
    });
    return result;
}

function getLibraryDirectory(messages) {
    let libDirectory = path.join(module.exports.baseDirectory, library);
    if (!fs.existsSync(libDirectory)) {
        fs.mkdirSync(libDirectory);
        messages.push('Created ' + libDirectory);
    }
    return libDirectory;
}

function getTestsDirectory() {
    let testsDirectory = path.join(module.exports.baseDirectory, 'tests');
    return testsDirectory;
}

function getFunctionTestsDirectory(messages, fnName) {
    let result;
    scope(getFunctionTestsDirectory.name, x => {
        let testsDirectory = getTestsDirectory(messages);
        if (!fs.existsSync(testsDirectory)) {
            fs.mkdirSync(testsDirectory);
            messages.push('Created ' + testsDirectory);
        }
    
        let fnTestDirectory = path.join(testsDirectory, fnName);
        result = fnTestDirectory;
    })
    return result;
}

function functionTest(args, messages) {
    let fnName = getFunctionName(args, messages, 0);

    let fnFile = getFunctionFile(messages, fnName);
    assert(() => fs.existsSync(fnFile));

    let fnTestDirectory = getFunctionTestsDirectory(messages, fnName);
    if (!fs.existsSync(fnTestDirectory)) {
        fs.mkdirSync(fnTestDirectory);
        messages.push('Created ' + fnTestDirectory);
    }

    let i = 1;
    let testFile;
    do {
        testFile = path.join(fnTestDirectory, i + '.js');
        i++;
    } while (fs.existsSync(testFile));
    assert(() => !fs.existsSync(testFile));
    fs.writeFileSync(testFile, `
const u = require("${module.exports.isWljUtilitiesPackage ? '../../index' : 'wlj-utilities'}");

const ${fnName} = require("../../${library}/${fnName}.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    // TODO: Fix broken test
    u.assert(false);
});
`);
    assert(() => fs.existsSync(testFile));
    messages.push('Created ' + testFile);

    let allTestsFile = path.join(module.exports.baseDirectory, 'test.js');
    if (!fs.existsSync(allTestsFile)) {
        fs.writeFileSync(allTestsFile, '');
        messages.push('Created ' + allTestsFile);
    } else {
        messages.push('Modified ' + allTestsFile);
    }
    fs.appendFileSync(allTestsFile, EOL);
    fs.appendFileSync(allTestsFile, `require("./${testFile}");`)
}

function functionRename(args, messages) {
    let fromName = getFunctionName(args, messages, 0);
    let toName = getFunctionName(args, messages, 1);

    let fromFile = getFunctionFile(messages, fromName);
    let toFile = getFunctionFile(messages, toName);

    assert(() => fs.existsSync(fromFile));
    assert(() => !fs.existsSync(toFile));
    fs.renameSync(fromFile, toFile);
    messages.push(`Renamed from ${fromFile} to ${toFile}`);

    let fromTests = getFunctionTestsDirectory(messages, fromName);
    let toTests = getFunctionTestsDirectory(messages, toName);

    assert(() => fs.existsSync(fromTests));
    assert(() => !fs.existsSync(toTests));
    fs.renameSync(fromTests, toTests);
    messages.push(`Renamed from ${fromTests} to ${toTests}`);
}

function getFunctionFile(messages, fnName) {
    let result;
    scope(getFunctionFile.name, x => {
        merge(x, {messages});
        let libDirectory = getLibraryDirectory(messages);

        let fnFile = path.join(libDirectory, fnName + '.js');
        result = fnFile;
    })
    return result;
}

function functionCreate(args, messages) {
    scope(functionCreate.name, x => {
        merge(x, {messages});

        let fnName = getFunctionName(args, messages, 0);

        let fnFile = getFunctionFile(messages, fnName);
        merge(x, {fnFile});
        assert(() => !fs.existsSync(fnFile));
        fs.writeFileSync(fnFile, `
${module.exports.isWljUtilitiesPackage ? 'const scope = require("./scope");' : 'const u = require("wlj-utilities");'}

module.exports = ${fnName};

function ${fnName}() {
    let result;
    ${module.exports.isWljUtilitiesPackage ? '' : 'u.'}scope(${fnName}.name, x => {
        // TODO
    });
    return result;
}
`);
        assert(() => fs.existsSync(fnFile));
        messages.push('Created ' + fnFile);

        functionTest(args, messages);

        let indexFile = path.join(module.exports.baseDirectory, 'index.js');
        if (!fs.existsSync(indexFile)) {
            fs.writeFileSync(indexFile, 'module.exports = {};');
            messages.push('Created ' + indexFile);
        } else {
            messages.push('Modified ' + indexFile);
        }
        fs.appendFileSync(indexFile, EOL);
        fs.appendFileSync(indexFile, `module.exports.${fnName} = require("./library/${fnName}.js");`);
        messages.push('Finished');
    });
}

function functionDelete(args, messages) {
    scope(functionDelete.name, x => {
        let fnName = getFunctionName(args, messages, 0);

        let fnFile = getFunctionFile(messages, fnName);

        if (fs.existsSync(fnFile)) {
            fs.unlinkSync(fnFile);
            messages.push('Deleted ' + fnFile);
        } else {
            messages.push('Does not exist: ' + fnFile);
        }

        let fnTestDirectory = getFunctionTestsDirectory(messages, fnName);

        if (fs.existsSync(fnTestDirectory)) {
            deleteDirectory(fnTestDirectory);
            messages.push('Deleted ' + fnTestDirectory);
        } else {
            messages.push('Does not exist: ' + fnTestDirectory);
        }

        // TODO: modify index.js and test.js
    });
}