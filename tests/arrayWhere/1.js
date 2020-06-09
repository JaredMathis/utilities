
const u = require("../../index");

const arrayWhere = require("../../library/arrayWhere.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assertIsEqualJson(
        () => arrayWhere([{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 5, b: 4 }], { a: 1 }),
        () => [{ a: 1, b: 2 }, { a: 1, b: 3 }]
    );
});
