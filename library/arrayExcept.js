
const scope = require("./scope");
const isArray = require("./isArray");
const assert = require("./assert");

module.exports = arrayExcept;

function arrayExcept(array, except) {
    let result;
    scope(arrayExcept.name, x => {
        assert(() => isArray(array));
        assert(() => isArray(except));
        
        result = [];

        for (let a of array) {
            if (except.includes(a)) {
                continue;
            }
            result.push(a);
        }
    });
    return result;
}
