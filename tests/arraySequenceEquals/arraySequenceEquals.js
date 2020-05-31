
const u = require("../../index");

const arraySequenceEquals = require("../../library/arraySequenceEquals.js");

u.scope(__filename, x => {
    u.assert(() => arraySequenceEquals([], []) === true);
    u.assert(() => arraySequenceEquals([1], [1]) === true);
    u.assert(() => arraySequenceEquals([1,2], [1,2]) === true);
    u.assert(() => arraySequenceEquals([1,2], [1,2,3]) === false);
    u.assert(() => arraySequenceEquals([1,2], [1,3]) === false);
});
