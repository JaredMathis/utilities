
const u = require("../../index");

const assertIsArray = require("../../library/assertIsArray.js");

u.scope(__filename, x => {
    u.assertThrows(() => assertIsArray(undefined));
    u.assertThrows(() => assertIsArray(null));
    u.assertThrows(() => assertIsArray(0));
    u.assertThrows(() => assertIsArray('0'));
    assertIsArray([0]);
});
