
const u = require("../../index");

const isString = require("../../library/isString.js");

u.scope(__filename, x => {
    u.assert(() => isString(''));
    u.assert(() => isString('123'));
    u.assert(() => isString('with space'));
    u.assert(() => !isString(1));
    u.assert(() => !isString(null));
    u.assert(() => !isString(undefined));
    u.assert(() => !isString(NaN));
});
