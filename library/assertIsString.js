
const scope = require("./scope");
const assert = require("./assert");
const isString = require("./isString");
const unwrapIfLambda = require("./unwrapIfLambda");

module.exports = assertIsString;

function assertIsString(s) {
    let result;
    scope(assertIsString.name, x => {
        let value = unwrapIfLambda(s);
        assert(() => isString(value));
    });
    return result;
}
