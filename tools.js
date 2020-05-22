const {
    isArray,
    isFunction,
    isDefined,
    isString,
    isInteger,
} = require('./core');

const {
    logIndent,
    merge,
    consoleLog,
} = require('./log');

const {
    assert
} = require('./assert');

module.exports = {
    loop,
    toDictionary,
    isArrayIndex,
};

/**
 * Return true to break out of loop.
 */
function loop(array, lambda) {
    let log = false;
    logIndent(loop.name, context => {
        merge(context, {array});
        merge(context, {lambda});

        assert(() => isArray(array));
        assert(() => isFunction(lambda));
    
        for (let index = 0; index < array.length; index++) {
            merge(context, {index});
            let iteration = array[index];
            merge(context, {iteration});
            let breakLoop = lambda(iteration, index);
            if (breakLoop) {
                break;
            }
        }
    })
}

function toDictionary(array, property) {
    let result = {};

    logIndent(toDictionary.name, context => {
    
        loop(array, a => {
            let key = a[property];
            merge(context, {key});
            assert(() => isDefined(key));
    
            if (result[key]) {
                throw new Error('Duplicate key');
            }
            result[key] = a; 
        });
    })

    return result;
}

function isArrayIndex(array, index) {
    assert(() => isArray(array) || isString(array));
    assert(() => isInteger(index));
    return 0 <= index && index < array.length;
}