
const u = require("../../index");

const args = require("../../library/args.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    args([]);
    // Too few arguments
    u.assertThrows(() => args([], u.isInteger));
    // Too many arguments
    u.assertThrows(() => args([1,2,3], u.isInteger));
    u.assertThrows(() => args([1,2], u.isInteger));
    // Correct arguments
    args([1], u.isInteger);
    args([1, 2], u.isInteger, u.isInteger);
    // Incorrect type
    u.assertThrows(() => args([1, '2'], u.isInteger, u.isInteger));
});
