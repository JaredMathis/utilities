const {
    logIndent,
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

    return logIndent(assert.name, context => {
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
    return logIndent(assertError.name, context => {
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
    return logIndent(assertFileExists.name, context => {
        merge(context, {fileName});
        assert(fileExists(fileName));
    });
}

function assertIsDefined(a) {
    return logIndent(assertIsDefined.name, context => {
        merge(context, {a});
        return assert(isDefined(a));
    });
}

function assertIsEqual(left, right) {
    return logIndent(assertIsEqual.name, context => {
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
    return logIndent(assertIsEqualJson.name, context => {
        merge(context, {left});
        merge(context, {right});

        assertIsDefined(left);
        assertIsDefined(right);

        let equals = JSON.stringify(left) === JSON.stringify(right);
        if (equals) {
            return;
        }
        return assertError();
    });
}

function assertAtLeast(left, right) {
    return logIndent(assertAtLeast.name, context => {
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
    return logIndent(assertAtMost.name, context => {
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