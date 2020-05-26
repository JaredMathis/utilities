
const scope = require("./scope");
const isUndefined = require('./isUndefined')

module.exports = merge;

/**
 * Does something special with undefined.
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
    for (let key in b) {
        a[key] = b[key];
        if (isUndefined(a[key])) {
            a[key] = '[undefined]';
        }
    }
}
