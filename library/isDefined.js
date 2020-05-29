
const isUndefined = require("./isUndefined");

module.exports = isDefined;

function isDefined(a) {
    return !isUndefined(a);
}
