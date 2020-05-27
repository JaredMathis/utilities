const scope = require('./library/scope');
const isUndefined = require('./library/isUndefined');
const merge = require('./library/merge');
const assert = require('./library/assert');
const isFunction = require('./library/isFunction');


const {
    consoleLog,
    logProperties,
} = require('./log');

const {
    isDefined,
    processExit,
    isInteger,
} = require('./core');

const fs = require('fs');

module.exports = {
    assertFileExists,
    assertAtLeast,
    assertAtMost,
    assertIsEqual,
    assertIsDefined,
    assertIsEqualJson,
};

function assertError(name) {
    throw new Error('Assert error: ' + name);
}

function fileExists(fileName) {
    return fs.existsSync(fileName);
}

function assertFileExists(fileName) {
    return scope(assertFileExists.name, context => {
        merge(context, {fileName});
        assert(fileExists(fileName));
    });
}

function assertIsDefined(a) {
    return scope(assertIsDefined.name, context => {
        merge(context, {a});
        return assert(isDefined(a));
    });
}

function assertIsEqual(left, right) {
    return scope(assertIsEqual.name, context => {
        merge(context, {left});
        assertIsDefined(left);

        merge(context, {right});
        assertIsDefined(right);

        let leftValue;
        if (isFunction(left)) {
            leftValue = left();
        } else {
            leftValue = left;
        }
        merge(context, {leftValue});
        let rightValue;
        if (isFunction(right)) {
            rightValue = right();
        } else {
            rightValue = right;
        }
        merge(context, {rightValue});

        let equals = leftValue === rightValue;
        if (equals) {
            return;
        }
        return assertError(assertIsEqual.name);
    });
}

function assertIsEqualJson(left, right) {
    return scope(assertIsEqualJson.name, context => {
        merge(context, {left});
        merge(context, {right});

        assertIsDefined(left);
        assertIsDefined(right);

        let leftValue;
        if (isFunction(left)) {
            leftValue = left();
        } else {
            leftValue = left;
        }
        merge(context, {leftValue});
        let rightValue;
        if (isFunction(right)) {
            rightValue = right();
        } else {
            rightValue = right;
        }
        merge(context, {rightValue});

        let equals = JSON.stringify(leftValue) === JSON.stringify(rightValue);
        if (equals) {
            return;
        }
        return assertError(assertIsEqualJson.name);
    });
}

function assertAtLeast(left, right) {
    return scope(assertAtLeast.name, context => {
        merge(context, {left});
        merge(context, {right});

        assert(isInteger(left));
        assert(isInteger(right));

        let atLeast = left >= right;
        if (atLeast) {
            return;
        }
        return assertError(assertAtLeast.name);
    });
}

function assertAtMost(left, right) {
    return scope(assertAtMost.name, context => {
        merge(context, {left});
        merge(context, {right});

        assert(isInteger(left));
        assert(isInteger(right));

        let atMost = left <= right;
        if (atMost) {
            return;
        }
        return assertError(assertAtMost.name);
    });
}