const u = require('../../index');
const path = require('path');

u.scope(__filename, context => {
    let version = u.getPackageVersion(__dirname);

    u.assertIsEqual(() => version, '1.0.0');
});