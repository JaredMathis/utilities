
const scope = require("./scope");
const unwrapIfLambda = require("./unwrapIfLambda");
const assert = require("./assert");
const isArray = require("./isArray");
const merge = require("./merge");

module.exports = assertIsArray;

function assertIsArray(a) {
    let result;
    scope(assertIsArray.name, x => {
        merge(x, {a})
        let value = unwrapIfLambda(a);
        assert(() => isArray(value));
    });
    return result;
}
