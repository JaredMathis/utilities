const path = require('path');
const fs = require('fs');
const u = require('../../all');
const commands = require('../../commandLine');

const log = true;

u.scope(__filename, x => {
    let libDirectory = path.join(__dirname, 'library');
    let aFile = path.join(libDirectory, 'a.js');
    let testsDirectory = path.join(__dirname, 'tests');
    let aDirectory = path.join(__dirname, 'tests/a');
    let testFile = path.join(__dirname, 'test.js');
    let indexFile = path.join(__dirname, 'index.js');

    try {
        cleanup();

        commands.baseDirectory = __dirname;

        let result = commands.fn(['a']);

        let expected = 'Created /Users/jared/Documents/GitHub/utilities/tests/fn/library\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/library/a.js\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/tests\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/tests/a\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/tests/a/a.js\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/test.js\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/index.js\n' +
        'Finished';

        if (result !== expected)
        if (log) console.log({result});

        u.assertIsEqualJson(() => result, () => expected);

        u.loop([
            libDirectory,
            aDirectory,
            testsDirectory,
            testFile,
            aFile,
            indexFile,
        ], f=>{
            u.merge(x,{f});
            u.assert(() => fs.existsSync(f));
        });
    } finally {
        cleanup();
    }

    function cleanup() {
        u.loop([indexFile,aFile,testFile], f => {
            if (fs.existsSync(f)) {
                fs.unlinkSync(f);
            }
        });

        u.loop([libDirectory, aDirectory, testsDirectory], d => {
            if (fs.existsSync(d)) {
                u.deleteDirectory(d);
            }
        });
    }
});