
const u = require("../../index");

const padNumber = require("../../library/padNumber.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assert(() => padNumber(1, 3) === '001');
    u.assert(() => padNumber(1, 0) === '1');
});
