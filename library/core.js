const isUndefined = require('./isUndefined');
const isString = require('./isString');
const config = require('./config');

module.exports = {
    isEqualJson,
}

function isEqualJson(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}