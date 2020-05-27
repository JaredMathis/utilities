
const scope = require("./scope");
const loop = require("./loop");
const propertiesAreEqual = require("./propertiesAreEqual");
const merge = require("./merge");
const assert = require("./assert");
const isUndefined = require("./isUndefined");

module.exports = arraySingle;

function arraySingle(array, matcher) {
    let result;
    scope(arraySingle.name, x => {
        merge(x,{array,matcher})
        let found = false;
        let keys = Object.keys(matcher);
        merge(x,{keys})
        loop(array, a => {
            if (propertiesAreEqual(a, matcher, keys)) {
                merge(x,{result});
                assert(() => !found);
                result = a;
                found = true;
            }
        })
        let p = propertiesAreEqual(array[0], matcher, keys)
        merge(x,{p});
        assert(() => found);
    });
    return result;
}
