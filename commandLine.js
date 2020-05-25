const { 
    isArray,
    isString,
} = require('./core');

const { 
    scope,
} = require('./log');

const { 
    loop,
} = require('./tools');

const { 
    assert,
} = require('./assert');

const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

let verbose = false;

module.exports = {
    commandLine,
    fn,
    baseDirectory: '.',
};

function commandLine() {
    scope(commandLine.name, x=> {
        let commands = {
            fn,
        };

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
        let result = command(remaining);
        console.log(result);
    
    });
}

function fn(args) {
    let result = [];
    scope(fn.name, x => {
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
const u = require("wlj-utilities");

module.exports = ${fnName};

function ${fnName}() {
    let result;
    u.scope(${fnName}.name, x => {

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
const u = require("wlj-utilities");
const ${fnName} = require("../../${library}/${fnName}.js");

u.scope(__filename, x => {

});
`);
        assert(() => fs.existsSync(testFile));
        result.push('Created ' + testFile);

        let allTestsFile = path.join(module.exports.baseDirectory, 'test.js');
        if (!fs.existsSync(allTestsFile)) {
            fs.writeFileSync(allTestsFile, '');
        }
        fs.appendFileSync(allTestsFile, EOL);
        fs.appendFileSync(allTestsFile, `require("./${testFile}");`)
        result.push('Finished');
    });

    return result.join(EOL);
}