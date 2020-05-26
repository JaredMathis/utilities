
const scope = require("./scope");
const assert = require("./assert");
const assertOnlyContainsProperties = require("./assertOnlyContainsProperties");
const assertIsStringArray = require("./assertIsStringArray");

module.exports = propertiesAreEqual;

function propertiesAreEqual(a, b, properties) {
    let result;
    scope(propertiesAreEqual.name, x => {

        assertIsStringArray(properties);

        assertOnlyContainsProperties(a, properties);
        assertOnlyContainsProperties(b, properties);

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
