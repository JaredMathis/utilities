
const scope = require("./scope");
const assert = require("./assert");
const loop = require("./loop");
const isArray = require("./isArray");
const assertIsStringArray = require("./assertIsStringArray");
const merge = require("./merge");
const unwrapIfLambda = require("./unwrapIfLambda");

module.exports = assertIsStringArrayNested;

function assertIsStringArrayNested(input) {
    let result;
    scope(assertIsStringArrayNested.name, x => {
        merge(x,{input});
        let value = unwrapIfLambda(input);
        assert(() => isArray(value));
        
        loop(value, v => {
            assertIsStringArray(() => v);
        });
    });
    return result;
}
