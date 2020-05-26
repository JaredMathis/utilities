
const u = require("../../all");

const arrayExcept = require("../../library/arrayExcept.js");

u.scope(__filename, x => {
    u.assertIsEqualJson(
        () => arrayExcept([1,2,3],[2,3]),
        () => [1]);
    u.assertIsEqualJson(
        () => arrayExcept([1,2,3],[1,2,3]),
        () => []);
    u.assertIsEqualJson(
        () => arrayExcept([1,2,3],[1,2,3,4]),
        () => []);
    u.assertIsEqualJson(
        () => arrayExcept([1,1,2,3,4],[4]),
        () => [1,1,2,3]);
});
