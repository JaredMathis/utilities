
const scope = require("./scope");
const assertIsString = require("./assertIsString");

module.exports = isGuid;

const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

function isGuid(input) {
    let result;
    scope(isGuid.name, x => {
        assertIsString(() => input);

        result = regex.test(input);
    });
    return result;
}
