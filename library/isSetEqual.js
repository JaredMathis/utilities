
const scope = require("./scope");
const assert = require("./assert");
const isArray = require("./isArray");

module.exports = isSetEqual;

function isSetEqual(a, b) {
    let result;
    scope(isSetEqual.name, x => {
        assert(() => isArray(a));
        assert(() => isArray(b));

        result = aMatchesB(a, b)
            && aMatchesB(b, a);

        function aMatchesB(a, b) {
            for (let i of a) {
                let matches = false;
                for (let j of b) {
                    if (j === i) {
                        matches = true;
                        break;
                    }
                }
                if (!matches) {
                    return false;
                }
            }
            return true;
        }
    });
    return result;
}
