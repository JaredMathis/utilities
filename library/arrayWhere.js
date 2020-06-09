
const scope = require("./scope");
const merge = require("./merge");
const assert = require("./assert");
const isArray = require("./isArray");
const isDefined = require("./isDefined");
const loop = require("./loop");
const propertiesAreEqual = require("./propertiesAreEqual");

module.exports = arrayWhere;

function arrayWhere(array, matcher) {
    let result;
    scope(arrayWhere.name, x => {
        merge(x,{array,matcher})
        result = [];
        assert(() => isArray(array));
        assert(() => isDefined(matcher));
        let keys = Object.keys(matcher);
        merge(x,{keys})
        loop(array, a => {
            if (propertiesAreEqual(a, matcher, keys)) {
                merge(x,{result});
                result.push(a);
            }
        });
    });
    return result;
}
