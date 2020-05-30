
const assert = require("./assert");
const scope = require("./scope");
const isArray = require("./isArray");
const isString = require("./isString");
const merge = require("./merge");
const unwrapIfLambda = require("./unwrapIfLambda");

module.exports = assertIsStringArray;

function assertIsStringArray(array) {
    let result;
    scope(assertIsStringArray.name, x => {
        merge(x, {array});
        let value = unwrapIfLambda(array);
        assert(() => isArray(value));

        for (let a of value) {
            assert(() => isString(a));
        }
    });
    return result;
}
