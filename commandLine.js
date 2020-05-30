const isString = require('./library/isString');
const scope = require('./library/scope');
const assert = require('./library/assert');
const merge = require('./library/merge');
const isArray = require('./library/isArray');
const isUndefined = require('./library/isUndefined');
const loop = require('./library/loop');

const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

let verbose = false;

module.exports = {
    commandLine,
    fn,
    baseDirectory: '.',
    /** Whether or not this is the wlj-utilities NPM package */
    isWljUtilitiesPackage: false
};

function commandLine(commands) {
    scope(commandLine.name, x=> {
        if (isUndefined(commands)) {
            commands = {
                fn,
            };
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
        command(remaining);    
    });
}

function fn(args) {
    let result = [];
    scope(fn.name, x => {
        merge(x, {args});
        assert(() => isArray(args));

        if (args.length !== 1) {
            result.push('Expecting 1 argument');
            return;
        }

        let fnName = args[0];
        assert(() => isString(fnName));

        const library = 'library';
        let libDirectory = path.join(module.exports.baseDirectory, library);
        if (!fs.existsSync(libDirectory)) {
            fs.mkdirSync(libDirectory);
            result.push('Created ' + libDirectory);
        }

        let fnFile = path.join(libDirectory, fnName + '.js');
        assert(() => !fs.existsSync(fnFile));
        fs.writeFileSync(fnFile, `
${module.exports.isWljUtilitiesPackage ? 'const scope = require("./scope");' : 'const u = require("wlj-utilities");' }

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
        result.push('Created ' + fnFile);

        let testsDirectory = path.join(module.exports.baseDirectory, 'tests');
        if (!fs.existsSync(testsDirectory)) {
            fs.mkdirSync(testsDirectory);
            result.push('Created ' + testsDirectory);
        }

        let fnTestDirectory = path.join(testsDirectory, fnName);
        if (!fs.existsSync(fnTestDirectory)) {
            fs.mkdirSync(fnTestDirectory);
            result.push('Created ' + fnTestDirectory);
        }

        let testFile = path.join(fnTestDirectory, fnName + '.js');
        assert(() => !fs.existsSync(testFile));
        fs.writeFileSync(testFile, `
const u = require("${module.exports.isWljUtilitiesPackage ? '../../index' : 'wlj-utilities' }");

const ${fnName} = require("../../${library}/${fnName}.js");

u.scope(__filename, x => {
    // TODO: Fix broken test
    u.assert(false);
});
`);
        assert(() => fs.existsSync(testFile));
        result.push('Created ' + testFile);

        let allTestsFile = path.join(module.exports.baseDirectory, 'test.js');
        if (!fs.existsSync(allTestsFile)) {
            fs.writeFileSync(allTestsFile, '');
            result.push('Created ' + allTestsFile);
        } else {
            result.push('Modified ' + allTestsFile);
        }
        fs.appendFileSync(allTestsFile, EOL);
        fs.appendFileSync(allTestsFile, `require("./${testFile}");`)

        let indexFile = path.join(module.exports.baseDirectory, 'index.js');
        if (!fs.existsSync(indexFile)) {
            fs.writeFileSync(indexFile, 'module.exports = {};');
            result.push('Created ' + indexFile);
        } else {
            result.push('Modified ' + indexFile);
        }
        fs.appendFileSync(indexFile, EOL);
        fs.appendFileSync(indexFile, `module.exports.${fnName} = require("./library/${fnName}.js");`);
        result.push('Finished');
    });

    return result.join(EOL);
}