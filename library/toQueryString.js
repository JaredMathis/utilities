
const scope = require("./scope");
const assert = require("./assert");
const merge = require("./merge");
const isDefined = require("./isDefined");
const isString = require("./isString");

module.exports = toQueryString;

function toQueryString(object) {
    let result;
    scope(toQueryString.name, x => {
        merge(x, {object});
        assert(() => isDefined(object));

        result = '';
        let first = true;
        for (let key in object) {
            merge(x, {key});
            if (first) {
                result += "?";
                first = false;
            } else {
                result += '&';
            }
            result += key;
            let value = object[key];
            merge(x, {value});
            assert(() => isString(value));
            result += '=';
            result += value;
        }
    });
    return result;
}
