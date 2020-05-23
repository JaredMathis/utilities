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
    arrayLast,
    arrayAll,
    arraySome,
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
            let element = array[index];
            merge(context, {element});
            let breakLoop = lambda(element, index);
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

function arrayLast(array) {
    assert(() => isArray(array) || isString(array));
    return array[array.length - 1];
}

/**
 * Returns true if array is empty
 * or if predicate is true for each element
 * of the array
 * @param {*} array 
 * @param {*} predicate 
 */
function arrayAll(array, predicate) {
    let success = true;

    logIndent(arrayAll.name, context => {
        assert(() => isArray(array));

        loop(array, a => {
            if (!predicate(a)) {
                success = false;
                return true;
            }
        })
    });

    return success;
}

/**
 * Returns false if array is empty
 * or if predicate is true for some element
 * of the array
 * @param {*} array 
 * @param {*} predicate 
 */
function arraySome(array, predicate) {
    let success = false;

    logIndent(arraySome.name, context => {
        assert(() => isArray(array));

        loop(array, a => {
            if (predicate(a)) {
                success = true;
                return true;
            }
        })
    });

    return success;
}