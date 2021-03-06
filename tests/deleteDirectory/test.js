const u = require('../../index');
const fs = require('fs');
const path = require('path');

u.scope(__filename, x => {
    const directory = path.join(__dirname, 'a');

    u.merge(x, {directory});
    if (fs.existsSync(directory)) {
        u.deleteDirectory(directory);
    }
    u.assert(() => !fs.existsSync(directory));

    u.merge(x, {step:'creating directory'});
    fs.mkdirSync(directory);

    let files = ['b.txt', 'c.txt'];
    u.loop(files, fileName => {
        let p = path.join(directory, fileName);
        fs.writeFileSync(p, fileName);
    });

    let actualFiles = fs.readdirSync(directory);
    u.assertIsEqualJson(() => actualFiles, () => files);

    u.deleteDirectory(directory);

    u.assert(() => !fs.existsSync(directory));
});