const u = require('../../all');
const path = require('path');
const fs = require('fs');

u.scope(__filename, context => {
    const p = path.join(__dirname, 'package.json');
    const q = path.join(__dirname, 'package-test.json');
    fs.copyFileSync(q, p);

    let version = u.getPackageVersion(__dirname);
    u.assertIsEqual(() => version, '1.0.0');

    u.bumpPackageVersion(__dirname);

    let nextVersion = u.getPackageVersion(__dirname);
    u.assertIsEqual(() => nextVersion, '1.0.1');

    fs.unlinkSync(p);
});