const u = require('../../all');
const path = require('path');

u.scope(__filename, context => {
    const p = path.join(__dirname, 'package.json');

    let version = u.getPackageVersion(p);

    u.assertIsEqual(() => version, '1.0.0');
});