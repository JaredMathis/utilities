
const scope = require("./scope");
const assert = require("./assert");
const loop = require("./loop");
const isArray = require("./isArray");
const assertIsStringArray = require("./assertIsStringArray");

module.exports = assertIsStringArrayNested;

function assertIsStringArrayNested(input) {
    let result;
    scope(assertIsStringArrayNested.name, x => {
        assert(() => isArray(input));
        
        loop(input, l => {
            assertIsStringArray(() => l);
        });
    });
    return result;
}
