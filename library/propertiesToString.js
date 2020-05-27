const isFunction = require('./../library/isFunction');
const isUndefined = require('./isUndefined');
const truncateStringTo = require('./../log').truncateStringTo;

module.exports = propertiesToString;

function propertiesToString(object, prefix) {
    if (isUndefined(prefix)) {
        prefix = '';
    }

    let result;

    result = [];

    const maxCharacters = 120;
    for (let property in object) {
        let o = {};
        o[property] = object[property];

        if (isFunction(o[property])) {
            o[property] = o[property].toString();
        }

        let json = JSON.stringify(o);
        let trimmed = truncateStringTo(json, maxCharacters);

        result.push(prefix + trimmed);
    }
    return result;
}
