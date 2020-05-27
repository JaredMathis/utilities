
const u = require("../../index");

const isSetEqual = require("../../library/isSetEqual.js");

u.scope(__filename, x => {
    u.assert(() => isSetEqual([], []) === true);
    u.assert(() => isSetEqual([1], []) === false);
    u.assert(() => isSetEqual([], [1]) === false);
    u.assert(() => isSetEqual([1], [1]) === true);
    u.assert(() => isSetEqual([1,2], [1]) === false);
    u.assert(() => isSetEqual([1], [1,2]) === false);
    u.assert(() => isSetEqual([1,1], [1]) === true);
    u.assert(() => isSetEqual([1,1], [2,1]) === false);
    u.assert(() => isSetEqual([1,1], [1,2]) === false);
    u.assert(() => isSetEqual([1,1,2], [1]) === false);
    u.assert(() => isSetEqual([1,2,1], [1]) === false);
    u.assert(() => isSetEqual([2,1,1], [1]) === false);
    u.assert(() => isSetEqual([1,1,2], [2,1]) === true);
    u.assert(() => isSetEqual([1,3,1,2], [2,3,3,1,3]) === true);
});
