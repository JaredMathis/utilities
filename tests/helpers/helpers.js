
const u = require("../../index");

const helpers = require("../../library/helpers.js");

u.scope(__filename, x => {
    u.assert(() => helpers.hasOwnProperty('EOL'));
});
