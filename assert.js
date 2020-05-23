const {
    scope,
    merge,
    consoleLog,
    logProperties,
} = require('./log');

const {
    isDefined,
    isUndefined,
    processExit,
    isInteger,
    isFunction,
} = require('./core');

const fs = require('fs');

module.exports = {
    assert,
    assertFileExists,
    assertAtLeast,
    assertAtMost,
    assertIsEqual,
    assertIsDefined,
    assertIsEqualJson,
};

function assert(b, exitLambda) {

    return scope(assert.name, context => {
        let log = false;

        if (log) console.log('assert entered');

        let result;
        if (isFunction(b)) {
            result = b();
        } else {
            result = b;
        }

        if (result === true) {
            if (log) console.log('assert satisified');
            return;
        }

        merge(context, {result});
        merge(context, {b});
        return assertError(exitLambda);
    });
}

function assertError(exitLambda) {
    return scope(assertError.name, context => {
        logProperties(context);
        if (isUndefined(exitLambda)) {
            exitLambda = processExit;
        }
        exitLambda();
    });
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
        return assertError();
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
        return assertError();
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
        return assertError();
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
        return assertError();
    });
}