const isUndefined = require('./isUndefined')
const isFunction = require('./isFunction')
const stringTrimLambdaPrefix = require('./stringTrimLambdaPrefix');

module.exports = merge;

/**
 * Does something special with undefined.
 * Does something special if b is a function.
 * @param {*} a 
 * @param {*} b 
 */
function merge(a, b) {
    if (isUndefined(a)) {
        throw new Error('merge received undefined first argument');
    }
    if (isUndefined(b)) {
        throw new Error('merge received undefined second argument');
    }
    let bValue;
    if (isFunction(b)) {
        bValue = {};
        let key = stringTrimLambdaPrefix(b.toString());
        bValue[key] = b();
    } else {
        bValue = b;
    }
    for (let key in bValue) {
        a[key] = bValue[key];
        if (isUndefined(a[key])) {
            a[key] = '[undefined]';
        }
    }
}
