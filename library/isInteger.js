
const scope = require("./scope");

module.exports = isInteger;

function isInteger(a) {
    let result;
    scope(isInteger.name, x => {
        result = parseInt(a, 10) === a;
    });
    return result;
}
