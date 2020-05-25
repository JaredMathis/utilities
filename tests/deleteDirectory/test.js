const u = require('../../all');
const fs = require('fs');
const path = require('path');

u.scope(__filename, context => {
    const directory = path.join(__dirname, 'a');

    u.merge(context, {directory});
    if (fs.existsSync(directory)) {
        u.deleteDirectory(directory);
    }
    u.assert(() => !fs.existsSync(directory));

    u.merge(context, {step:'creating directory'});
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