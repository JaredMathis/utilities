const isInteger = require('./isInteger');
const isDefined = require('./isDefined');
const merge = require('./merge');
const assert = require('./assert');
const isArray = require('./isArray');
const isString = require('./isString');
const scope = require('./scope');
const loop = require('./loop');

module.exports = {
    toDictionary,
    isArrayIndex,
    arrayLast,
    arrayAll,
    arraySome,
    isDistinct,
    loopPairs,
    arrayMax,
    arrayMin,
    arrayCount,
    arrayMin,
    stringSuffix,
};


function toDictionary(array, property) {
    let result = {};

    scope(toDictionary.name, context => {
    
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
    let result;
    scope(isArrayIndex.name, x => {
        merge(x,{array});
        merge(x,{index});
        let ia = isArray(array);
        merge(x,{ia});
        let is = isString(array);
        merge(x,{is});
        assert(() => ia || is);
        let ii = isInteger(index);
        merge(x,{ii});
        assert(() => ii);
        let lower = 0 <= index;
        let upper = index < array.length;
        merge(x,{lower});
        merge(x,{upper});
        result = lower && upper;
    });
    return result;
}

function arrayLast(array) {
    assert(() => isArray(array) || isString(array));
    return array[array.length - 1];
}
function arrayMax(array) {
    let max;

    scope(arrayAll.name, context => {
        assert(() => isArray(array));
        
        max = array[0]

        loop(array, a => {
            if (a > max) {
                max = a;
            }
        })
    });

    return max;
}
function arrayMin(array) {
    let min;

    scope(arrayAll.name, context => {
        assert(() => isArray(array));
        
        min = array[0]

        loop(array, a => {
            if (a < min) {
                min = a;
            }
        })
    });

    return min;
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

    scope(arrayAll.name, context => {
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

    scope(arraySome.name, context => {
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

function loopPairs(array, lambda) {
    scope(loopPairs.name, context => {
        loop(array, (a, i) => {
            let result;
            loop(array, (b, j) => {
                if (j <= i) {
                    return;
                }
    
                result = lambda(a, b);
                if (result) {
                    return true;
                }
            });
            if (result) {
                return true;
            }
        });
    });
}

function isDistinct(array) {
    let success = true;

    scope(isDistinct.name, context => {
        assert(() => isArray(array));

        loopPairs(array, (a, b) => {
            if (a === b) {
                success = false;
            }
        });
    });

    return success;
}


function arrayCount(array, predicate) {
    let count = 0;

    scope(arrayCount.name, context => {
        assert(() => isArray(array));

        loop(array, a => {
            if (predicate(a)) {
                count++;
            }
        })
    });

    return count;
}

function stringSuffix(string, count) {
    let result;
    scope(stringSuffix.name, context => {
        assert(() => isString(string));

        assert(() => isInteger(count));
        assert(() => 0 <= count);
        assert(() => count <= string.length);

        result = string.substring(string.length - count);
    });
    return result;
}