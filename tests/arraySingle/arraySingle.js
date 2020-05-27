
const u = require("../../index");

const arraySingle = require("../../library/arraySingle.js");

u.scope(__filename, x => {
    let e;
    let result;
    
    e = {a:1,b:2};
    result = arraySingle([e], {a:1});
    u.merge(x,{result});
    u.assert(() => result === e);
    
    u.assertThrows(() => arraySingle([e, e], {a:1}));
    u.assertThrows(() => arraySingle([1, e, e], {a:1}));
    u.assert(() => arraySingle([1, e], {a:1}) === e);
    u.assertThrows(() => arraySingle([1, e], {a:1, b:1}));
    u.assert(() => arraySingle([1, e], {a:1, b:2}) === e);
});
