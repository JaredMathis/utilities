const isUndefined = require('./library/isUndefined');

module.exports = {
    processExit,
    isEqualJson,
    isDefined,
    isFunction,
    isString,
}

function isString(s) {
    return (s + "") === s;
}

function processExit() {
    let log = false;
    if (log) {
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

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}