
const scope = require("./scope");
const assertIsString = require("./assertIsString");
const helpers = require('./helpers');

module.exports = splitByEOL;

function splitByEOL(text) {
    let result;
    scope(splitByEOL.name, x => {
        assertIsString(() => text);
        result = text.split(helpers.EOL);
    });
    return result;
}
