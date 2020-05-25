const isString = require("../core").isString;
const isFunction = require("../core").isFunction;
const processExit = require("../core").processExit;
const logProperties = require("../log").logProperties;

module.exports = scope;

let count = 0;

function scope(name, lambda) {
    count++;

    let result;
    
    if (!isString(name)) {
        error(scope.name, 'Expecting name to be string');
    }
    if (!isFunction(lambda)) {
        error(scope.name, 'Expecting lambda to be function');
    }

    const x = {};
    try {
        result = lambda(x);
    } catch (e) {
        count--;

        if (count === 0) {
            let offset = 1;
            console.log(name + ' entered');
            logProperties(x, offset);

            let current = e;
            while ((current instanceof ScopeError)) {
                offset++
                console.log(current.name + ' entered');
                logProperties(current.context, offset);
                current = current.innerError;
            }

            if (!(e instanceof ScopeError)) {
                console.log(e);
            }

            processExit();
        } else {
            throw new ScopeError(name, x, e);
        }
    }

    count--;

    return result;
}

function error(name, message) {
    throw new Error(`Error: ${name}: ${message}`)
}

function ScopeError(name, context, innerError) {
    this.name = name;
    this.context = context;
    this.innerError = innerError;
}

//ScopeError.prototype = new Error();