const assert = require("./assert");
const scope = require('./scope');
const isDefined = require("../core").isDefined;
const isFunction = require("../core").isFunction;
const merge = require("../log").merge;

module.exports = assertIsEqualJson;

function assertIsEqualJson(left, right) {
    let result;
    scope(assertIsEqualJson.name, x => {
        merge(x, {left});
        merge(x, {right});
        assert(() => isDefined(left));
        assert(() => isDefined(right));

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

        assert(() => JSON.stringify(leftValue) === JSON.stringify(rightValue));
    });
    return result;
}
