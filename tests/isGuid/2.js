
const u = require("../../index");

const isGuid = require("../../library/isGuid.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assert(() => isGuid("a1ef9eb3-24d6-4411-99fa-f0be0f9a9be4") === true);

});
