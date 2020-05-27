
const u = require("../../index");

const range = require("../../library/range.js");

u.scope(__filename, x => {
    u.assertThrows(() => u.assertIsEqualJson(() => range(-1), () => []));
    u.assertThrows(() => u.assertIsEqualJson(() => range('a'), () => []));
    u.assertThrows(() => u.assertIsEqualJson(() => range(1,-1), () => []));
    u.assertIsEqualJson(() => range(0), () => []);
    u.assertIsEqualJson(() => range(3), () => [0,1,2]);
    u.assertIsEqualJson(() => range(3,1), () => [1,2, 3]);
});
