
const u = require("../../index");

const assertIsString = require("../../library/assertIsString.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    assertIsString("test");
});
