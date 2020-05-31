
const scope = require("./scope");
const assertIsArray = require("./assertIsArray");
const range = require("./range");
const loop = require("./loop");

module.exports = arraySequenceEquals;

function arraySequenceEquals(a, b) {
    let result;
    scope(arraySequenceEquals.name, x => {
        assertIsArray(() => a);
        assertIsArray(() => b);

        if (a.length !== b.length) {
            result = false;
            return;
        }

        result = true;

        loop(range(a.length), i => {
            if (a[i] !== b[i]) {
                result = false;
                return true;
            }
        });
    });
    return result;
}
