const {
    processExit,
    isUndefined,
    isFunction,
} = require('./core');

module.exports = {
    consoleLog,
    logProperties,
}

// TODO: Validate arguments of framework

let indent = 0;

let context = {};

function isString(o) {
    return o.toString() === o;
}

function getPrefix(offset) {
    offset = offset || 0;

    let tab = "  ";
    let prefix = "";
    for (let i = 0; i < indent - offset; i++) {
        prefix += tab;
    }
    return prefix;
}

/**
 * Does something special if the property name is "parent".
 */
function logProperties(object, offset) {
    offset = offset || 0;
    let parent = '$parent';
    let name = '$name';

    let log = false;
    if (log) console.log('logProperties entered', {object});

    let prefix = getPrefix(offset);

    if (object.hasOwnProperty(parent)) {
        logProperties(object[parent], offset + 1);
    }

    if (object.hasOwnProperty(name)) {
        console.log(getPrefix(offset + 1) + object[name] + ' entered');
    }

    const maxCharacters = 120;
    for (let property in object) {
        if (log) console.log('logProperties', {property});
        if ([parent, name].includes(property)) {
            continue;
        }

        let o = {};
        o[property] = object[property];

        if (isFunction(o[property])) {
            o[property] = o[property].toString();
        }

        let json = JSON.stringify(o);
        if (log) console.log('logProperties', {json});
        if (log) console.log('logProperties', {keys:Object.keys(o)});

        let trimmed = truncateStringTo(json, maxCharacters);
        console.log(prefix + trimmed);
    }    
}

function scope(name, lambda) {
    let log = false;
    if (log) console.log('scope entered');
    if (log) consoleLog(name + " entered");

    let result;

    indent++;
    let oldContext = context;
    newContext = {};
    newContext.$name = name; 
    newContext.$parent = oldContext;
    context = newContext;
    try {
        result = lambda(context);
    } catch (e) {
        console.log('scope error');
        logProperties(context);
        console.log(e);
        processExit();
    }
    context = oldContext;
    indent--;

    if (log) consoleLog(name + " leaving");

    return result;
}

function consoleLog(message) {
    let log = false;
    let verbose = false;
    if (log) console.log('consoleLog entered');

    if (indent < 0) {
        if (verbose)
        if (log) console.log('indent negative');
        console.log('consoleLog error');
        console.log('need to call consoleLog inside scope');
        processExit();
    } else {
        if (verbose)
        if (log) console.log('indent not negative');
    }

    if (isString(message)) {
        if (verbose)
        if (log) console.log('message is string');
        let prefix = getPrefix();
        if (log) prefix = "message: " + prefix;
        console.log(prefix + message);

    } else {
        if (log) console.log('message is not string');
        logProperties(message);
    }

    if (log) console.log('consoleLog leaving');
}