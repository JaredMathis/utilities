
const u = require("../../index");

const arraySingle = require("../../library/arraySingle.js");

u.scope(__filename, x => {
    let e = {a:1,b:2};
    let result = arraySingle([e], {a:1});
    u.merge(x,{result});
    // u.assert(() => result === e);
});
