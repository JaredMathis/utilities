
const u = require("../../index");

const splitByEOL = require("../../library/splitByEOL.js");

u.scope(__filename, x => {
    u.assertIsEqualJson(() => splitByEOL(`123`), () => [`123`]);
    u.assertIsEqualJson(() => splitByEOL(`1${u.EOL}23`), () => [`1`,`23`]);
});
