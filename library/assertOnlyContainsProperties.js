
const scope = require("./scope");
const assert = require("./assert");
const merge = require("./merge");
const assertIsStringArray = require("./assertIsStringArray");
const isDefined = require("./../core").isDefined;

module.exports = assertOnlyContainsProperties;

function assertOnlyContainsProperties(object, properties) {
    let result;
    scope(assertOnlyContainsProperties.name, x => {
        merge(x, {object});
        merge(x, {properties});
        
        assert(() => isDefined(object));
        assertIsStringArray(properties);

        for (let key in object) {
            assert(() => properties.includes(key));
        }

        for (let property of properties) {
            assert(() => object.hasOwnProperty(property));
        }
    });
    return result;
}
