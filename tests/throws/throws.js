
const u = require("../../index");
const throws = require("../../library/throws.js");

u.scope(__filename, x => {
    const throwingFunction = () => { throw new Error('error') };
    const nonThrowingFunction = () => {};
    
    u.assert(() => throws(throwingFunction));
    u.assert(() => !throws(nonThrowingFunction));
});
