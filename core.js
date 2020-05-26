const isUndefined = require('./library/isUndefined');

module.exports = {
    processExit,
    isEqualJson,
    isDefined,
    isInteger,
    range,
    isFunction,
    isString,
}

function isString(s) {
    return (s + "") === s;
}

function processExit() {
    processExit.log = false;
    if (processExit.log) {
        let stack = new Error().stack;
        console.log(stack);
    }
    console.log('Calling process.exit(1)');
    process.exit(1);
}

function isEqualJson(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
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