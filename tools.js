const {
    isArray,
    isFunction,
    isDefined,
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
    
        let iterations = 0;
        for (let i = 0; i < array.length; i++) {
            iterations++;
            let a = array[i];
            let breakLoop = lambda(a, i);
            if (breakLoop) {
                break;
            }
        }

        if (log) consoleLog({iterations});
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