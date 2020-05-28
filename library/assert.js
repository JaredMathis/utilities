
const scope = require("./scope");
const merge = require("./merge");
const isFunction = require("./isFunction");

module.exports = assert;

function assert(b) {
    let result;
    scope(assert.name, x => {
        merge(x, {b});

        let bValue;
        if (isFunction(b)) {
            merge(x, b);
            bValue = b();
            merge(x, {bValue});
        } else {
            bValue = b;
        }

        if (bValue) {
            return;
        }

        throw new Error('assert failed');
    });
    return result;
}
