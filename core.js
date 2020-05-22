/**
 * These functions have no dependencies
 */

module.exports = {
    processExit,
    isEqualJson,
    isArray,
    isUndefined,
    isDefined,
    isInteger,
    range,
    isFunction,
    isString,
    throws,
}

function isArray(a) {
    return Array.isArray(a);
}

function isString(s) {
    return (s + "") === s;
}

function processExit() {
    console.log('Calling process.exit(1)');
    process.exit(1);
}

function isEqualJson(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function isUndefined(a) {
    return typeof a === 'undefined';
}

function isDefined(a) {
    return !isUndefined(a);
}

function isInteger(a) {
    return parseInt(a, 10) === a;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function range(count, start) {
    if (isUndefined(start)) {
        start = 0;
    }
    let result = [];
    let max = start + count - 1;
    for (let i = start; i <= max; i++) {
        result.push(i);
    }
    return result;
}

function throws(lambda) {
    try {
        lambda();
        return false;
    } catch (e) {
        return true;
    }
}