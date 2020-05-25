const assert = require("./assert");
const scope = require('./scope');
const isDefined = require("../core").isDefined;
const isFunction = require("../core").isFunction;

module.exports = assertIsEqualJson;

function assertIsEqualJson(left, right) {
    let result;
    scope(assertIsEqualJson.name, x => {
        assert(() => isDefined(left));
        assert(() => isDefined(right));

        let leftValue;
        if (isFunction(left)) {
            leftValue = left();
        } else {
            leftValue = left;
        }
        let rightValue;
        if (isFunction(right)) {
            rightValue = right();
        } else {
            rightValue = right;
        }

        assert(() => JSON.stringify(leftValue) === JSON.stringify(rightValue));
    });
    return result;
}
