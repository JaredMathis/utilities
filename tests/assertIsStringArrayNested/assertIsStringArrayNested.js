
const u = require("../../index");

const assertIsStringArrayNested = require("../../library/assertIsStringArrayNested.js");

u.scope(__filename, x => {
    assertIsStringArrayNested([[]]);
    assertIsStringArrayNested([['a']]);
    assertIsStringArrayNested([['a', 'b']]);
    assertIsStringArrayNested([['a', 'b'],['c']]);
    u.assertThrows(() => assertIsStringArrayNested([['a', 'b'],['c'], 'a']));
    u.assertThrows(() => assertIsStringArrayNested([['a', 'b'],['c'], 1]));
    u.assertThrows(() => assertIsStringArrayNested(['a', 'v']));
});
