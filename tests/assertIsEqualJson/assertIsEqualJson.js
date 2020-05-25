
const u = require("../../all");
const assertIsEqualJson = require("../../library/assertIsEqualJson.js");

u.scope(__filename, x => {
    u.assert(() => !u.throws(() => assertIsEqualJson(1, 1)));
    u.assert(() => u.throws(() => assertIsEqualJson(1, undefined)));
    u.assert(() => u.throws(() => assertIsEqualJson(undefined, 1)));
    u.assert(() => u.throws(() => assertIsEqualJson(undefined, undefined)));
});
