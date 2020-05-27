
const scope = require("./scope");
const assert = require("./assert");
const isArray = require("./isArray");

module.exports = isSetEqual;

function isSetEqual(a, b) {
    let result;
    scope(isSetEqual.name, x => {
        assert(() => isArray(a));
        assert(() => isArray(b));

        result = isSubset(a, b)
            && isSubset(b, a);

        function isSubset(a, b) {
            for (let i of a) {
                if (!b.includes(i)) {
                    return false;
                }
            }
            return true;
        }
    });
    return result;
}
