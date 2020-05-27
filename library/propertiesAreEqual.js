
const scope = require("./scope");
const assertIsStringArray = require("./assertIsStringArray");
const merge = require("./merge");
const loop = require("./loop");

module.exports = propertiesAreEqual;

function propertiesAreEqual(a, b, properties) {
    let result;
    scope(propertiesAreEqual.name, x => {
        merge(x, {a,b,properties});
        assertIsStringArray(properties);

        result = true;
        loop(properties, property => {
            let equal = a[property] === b[property];
            if (!equal) {
                result = false;
                return true;
            }
        });
    });
    return result;
}
