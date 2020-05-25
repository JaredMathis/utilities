const path = require('path');
const fs = require('fs');
const u = require('../../all');
const commands = require('../../commandLine');

u.scope(__filename, x => {
    let libDirectory = path.join(__dirname, 'library');
    let aFile = path.join(libDirectory, 'a.js');
    let testsDirectory = path.join(__dirname, 'tests');
    let aDirectory = path.join(__dirname, 'tests/a');
    let testFile = path.join(__dirname, 'test.js');

    try {
        cleanup();

        commands.baseDirectory = __dirname;

        let result = commands.fn(['a']);

        let expected = 'Created /Users/jared/Documents/GitHub/utilities/tests/fn/library\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/library/a.js\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/tests\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/tests/a\n' +
        'Created /Users/jared/Documents/GitHub/utilities/tests/fn/tests/a/a.js\n' +
        'Finished';
        u.assertIsEqualJson(() => result, () => expected);

        u.loop([
            libDirectory,
            aDirectory,
            testsDirectory,
            testFile,
            aFile,
        ], f=>{
            u.merge(x,{f});
            u.assert(() => fs.existsSync(f));
        });
    } finally {
        cleanup();
    }

    function cleanup() {
        if (fs.existsSync(aFile)) {
            fs.unlinkSync(aFile);
        }

        u.loop([libDirectory, aDirectory, testsDirectory], d => {
            if (fs.existsSync(d)) {
                u.deleteDirectory(d);
            }
        });

        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    }
});