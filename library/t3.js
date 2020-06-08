
const scope = require("./scope");

module.exports = test;

function test() {
    let result;
    scope(test.name, x => {
        // TODO
    });
    return result;
}
