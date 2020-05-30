
const u = require("../../index");

const unwrapIfLambda = require("../../library/unwrapIfLambda.js");

u.scope(__filename, x => {
    // TODO: Fix broken test
    u.assert(() => unwrapIfLambda(null) === null);
    u.assert(() => unwrapIfLambda(() => null) === null);
    u.assert(() => u.isUndefined(unwrapIfLambda(undefined)));
    u.assert(() => u.isUndefined(unwrapIfLambda(() => undefined)));
    u.assert(() => unwrapIfLambda(1) === 1);
    u.assert(() => unwrapIfLambda(() => 1) === 1);
    u.assert(() => unwrapIfLambda('1') === '1');
    u.assert(() => unwrapIfLambda(() => '1') === '1');
    u.assertIsEqualJson(() => unwrapIfLambda([1]), [1]);
    u.assertIsEqualJson(() => unwrapIfLambda(() => [1]), [1]);
});
