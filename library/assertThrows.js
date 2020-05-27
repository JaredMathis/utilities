
const scope = require("./scope");
const assert = require("./assert");
const throws = require("./throws");
const merge = require("./merge");

module.exports = assertThrows;

function assertThrows(lambda) {
    let result;
    scope(assertThrows.name, x => {
        merge(x, {lambda});
        assert(() => throws(lambda));
    });
    return result;
}
