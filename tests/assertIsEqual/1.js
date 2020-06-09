
const u = require("../../index");

const assertIsEqual = require("../../library/assertIsEqual.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assertIsEqual(1, 1);
    u.assertThrows(() => u.assertIsEqual(1, "1"));
});
