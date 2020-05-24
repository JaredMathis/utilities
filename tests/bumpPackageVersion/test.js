const u = require('../../all');
const path = require('path');
const fs = require('fs');

u.scope(__filename, context => {
    const p = path.join(__dirname, 'package.json');
    const q = path.join(__dirname, 'package-test.json');
    fs.copyFileSync(p, q);

    let version = u.getPackageVersion(q);
    u.assertIsEqual(() => version, '1.0.0');

    u.bumpPackageVersion(q);

    let nextVersion = u.getPackageVersion(q);
    u.assertIsEqual(() => nextVersion, '1.0.1');

    fs.unlinkSync(q);
});