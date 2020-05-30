
const u = require("../../index");

const assertIsString = require("../../library/assertIsString.js");

u.scope(__filename, x => {
    assertIsString(() => "");
    assertIsString(() => "123");
    let d = "12";
    assertIsString(() => d);

    u.assertThrows(() => assertIsString(() => null));
    u.assertThrows(() => assertIsString(() => undefined));
    u.assertThrows(() => assertIsString(() => 123));
    u.assertThrows(() => assertIsString(() => []));
});
