const isUndefined = require('./library/isUndefined');
const isString = require('./library/isString');
const config = require('./library/config');

module.exports = {
    isEqualJson,
}

function isEqualJson(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}