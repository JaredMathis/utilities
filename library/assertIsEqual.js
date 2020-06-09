
const scope = require("./scope");
const assert = require("./assert");
const merge = require("./merge");
const unwrapIfLambda = require("./unwrapIfLambda");

module.exports = assertIsEqual;

function assertIsEqual(a, b) {
    let result;
    scope(assertIsEqual.name, x => {
        merge(x, a);
        merge(x, b);
        assert(() => unwrapIfLambda(a) === unwrapIfLambda(b))
    });
    return result;
}
