
const scope = require("./scope");
const assert = require("./assert");
const isString = require("./isString");
const unwrapIfLambda = require("./unwrapIfLambda");
const merge = require("./merge");

module.exports = assertIsString;

function assertIsString(s) {
    let result;
    scope(assertIsString.name, x => {
        let value = unwrapIfLambda(s);
        merge(x, {value});
        assert(() => isString(value));
    });
    return result;
}
