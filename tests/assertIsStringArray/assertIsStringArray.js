
const u = require("../../index");

const assertIsStringArray = require("../../library/assertIsStringArray.js");

u.scope(__filename, x => {
    u.assert(() => !u.throws(() => assertIsStringArray(['a'])));
    u.assert(() => !u.throws(() => assertIsStringArray(['ab'])));
    u.assert(() => !u.throws(() => assertIsStringArray(['ab','c'])));
    u.assert(() => u.throws(() => assertIsStringArray(['ab','c', 1])));
    u.assert(() => !u.throws(() => assertIsStringArray([])));
    u.assert(() => u.throws(() => assertIsStringArray([1])));
});
