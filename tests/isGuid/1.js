
const u = require("../../index");

const isGuid = require("../../library/isGuid.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assert(() => isGuid('01234567-9ABC-DEF0-1234-56789ABCDEF0') === true);
    u.assert(() => isGuid('01234567-9abc-DEF0-1234-56789ABCDEF0') === true);
    u.assert(() => isGuid('01234567-9-DEF0-1234-56789ABCDEF0') === false);
});
