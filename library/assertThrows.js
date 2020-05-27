
const scope = require("./scope");
const assert = require("./assert");
const throws = require("./throws");

module.exports = assertThrows;

function assertThrows(lambda) {
    let result;
    scope(assertThrows.name, x => {
        assert(() => throws(lambda));
    });
    return result;
}
