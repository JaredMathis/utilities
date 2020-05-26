
const scope = require("./scope");
const merge = require("./merge");
const isFunction = require("../core").isFunction;

module.exports = assert;

function assert(b) {
    let result;
    scope(assert.name, x => {
        merge(x, {b});

        let bValue;
        if (isFunction(b)) {
            bValue = b();
        } else {
            bValue = b;
        }
        merge(x, {bValue});

        if (bValue) {
            return;
        }

        throw new Error('assert failed');
    });
    return result;
}
