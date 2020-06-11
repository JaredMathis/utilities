
const scope = require("./scope");
const assert = require("./assert");
const isInteger = require("./isInteger");

module.exports = padNumber;

function padNumber(n, width, z) {
    let result;
    scope(padNumber.name, x => {
        assert(() => isInteger(n));
        assert(() => n >= 0);
        assert(() => isInteger(width));
        assert(() => width >= 0);

        z = z || '0';
        n = n + '';
        result = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    });
    return result;
}
