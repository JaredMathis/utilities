const isString = require("./isString");
const isFunction = require("./isFunction");
const processExit = require("./processExit");
const propertiesToString = require("./propertiesToString");
const config = require("./config");

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
            let messages = [];

            let indent = '  ';
            messages.push(name + ' entered');
            let properties = propertiesToString(x, indent);
            for (let p of properties) {
                messages.push(p);
            }

            let current = e;
            while ((current instanceof ScopeError)) {
                messages.push(indent + current.name + ' entered');
                indent += '  '
                let properties = propertiesToString(current.context, indent);
                for (let p of properties) {
                    messages.push(p);
                }
                current = current.innerError;
            }
            //if (config.log.scopeError) console.log(current);

            throw new ScopeError(name, messages, current);
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