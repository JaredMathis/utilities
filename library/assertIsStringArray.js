
const assert = require("./assert");
const scope = require("./scope");
const isArray = require("./isArray");
const isString = require("./isString");
const merge = require("./merge");
const unwrapIfLambda = require("./unwrapIfLambda");
const loop = require("./loop");

module.exports = assertIsStringArray;

function assertIsStringArray(array) {
    let result;
    scope(assertIsStringArray.name, x => {
        merge(x, {array});
        let value = unwrapIfLambda(array);
        assert(() => isArray(value));

        loop(value, v => {
            assert(() => isString(v));
        });
    });
    return result;
}
