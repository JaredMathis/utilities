
const u = require("../../all");

const isArray = require("../../library/isArray.js");

u.scope(__filename, x => {
    u.assert(() => isArray([]));
    u.assert(() => isArray([1,2,3]));
    u.assert(() => isArray(['a']));
    u.assert(() => !isArray('a'));
    u.assert(() => !isArray(1));
});
