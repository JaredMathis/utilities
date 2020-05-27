
const assert = require("./assert");
const scope = require("./scope");
const isArray = require("./isArray");
const isString = require("./isString");

module.exports = assertIsStringArray;

function assertIsStringArray(array) {
    let result;
    scope(assertIsStringArray.name, x => {
        assert(() => isArray(array));

        for (let a of array) {
            assert(() => isString(a));
        }
    });
    return result;
}
