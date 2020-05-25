
const u = require("../../all");

const toQueryString = require("../../library/toQueryString.js");

u.scope(__filename, x => {
    let actual = toQueryString({a:"1",b:"2"});
    u.merge(x, {actual});
    let expected = '?a=1&b=2';
    u.merge(x, {expected});
    u.assert(() => actual === expected);
});
