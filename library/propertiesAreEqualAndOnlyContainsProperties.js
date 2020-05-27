
const scope = require("./scope");
const assert = require("./assert");
const assertOnlyContainsProperties = require("./assertOnlyContainsProperties");
const assertIsStringArray = require("./assertIsStringArray");
const propertiesAreEqual = require("./propertiesAreEqual");

module.exports = propertiesAreEqualAndOnlyContainsProperties;

function propertiesAreEqualAndOnlyContainsProperties(a, b, properties) {
    let result;
    scope(propertiesAreEqualAndOnlyContainsProperties.name, x => {
        assertOnlyContainsProperties(a, properties);
        assertOnlyContainsProperties(b, properties);
        
        result = propertiesAreEqual(a, b, properties);
    });
    return result;
}
