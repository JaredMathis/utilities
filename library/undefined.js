
const scope = require("./scope");

module.exports = undefined;

function undefined() {
    let result;
    scope(undefined.name, x => {
        // TODO
    });
    return result;
}
