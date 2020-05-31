const assert = require("./assert");
const scope = require('./scope');
const isDefined = require("./isDefined");
const isFunction = require("./isFunction");
const merge = require("./merge");

module.exports = assertIsEqualJson;

function assertIsEqualJson(left, right) {
    let result;
    scope(assertIsEqualJson.name, x => {
        merge(x, {left});
        merge(x, {right});

        let leftValue;
        if (isFunction(left)) {
            leftValue = left();
        } else {
            leftValue = left;
        }
        merge(x, {leftValue});

        let rightValue;
        if (isFunction(right)) {
            rightValue = right();
        } else {
            rightValue = right;
        }
        merge(x, {rightValue});

        assert(() => isDefined(left));
        assert(() => isDefined(right));
        assert(() => JSON.stringify(leftValue) === JSON.stringify(rightValue));
    });
    return result;
}
