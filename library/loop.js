
const scope = require("./scope");
const merge = require("./merge");
const isFunction = require("./isFunction");
const assert = require("./assert");
const isArray = require("./isArray");

module.exports = loop;

function loop(array, lambda) {
    let result;

    let log = false;
    scope(loop.name, context => {
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
    });
    return result;
}
