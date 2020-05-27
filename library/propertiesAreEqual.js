
const scope = require("./scope");
const assertIsStringArray = require("./assertIsStringArray");
const merge = require("./merge");

module.exports = propertiesAreEqual;

function propertiesAreEqual(a, b, properties) {
    let result;
    scope(propertiesAreEqual.name, x => {
        merge(x, {a,b,properties});
        assertIsStringArray(properties);

        result = true;
        for (let property in a) {
            let equal = a[property] === b[property];
            if (!equal) {
                result = false;
                return;
            }
        }
    });
    return result;
}
