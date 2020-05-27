
module.exports = isString;

function isString(s) {
    let result = (s + "") === s;
    return result;
}
