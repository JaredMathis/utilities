
const u = require("../../index");

const isInteger = require("../../library/isInteger.js");

u.scope(__filename, x => {
    u.assert(() => isInteger(1));
    u.assert(() => isInteger(10));
    u.assert(() => isInteger(2));
    u.assert(() => isInteger(-1));
    u.assert(() => isInteger(-123));
    u.assert(() => !isInteger(NaN));
    u.assert(() => !isInteger(null));
    u.assert(() => !isInteger(undefined));
    u.assert(() => !isInteger('test'));
});
