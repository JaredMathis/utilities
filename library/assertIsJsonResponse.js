const scope = require("./scope");
const assert = require("./assert");
const assertIsEqual = require("./../assert").assertIsEqual;
const assertIsEqualJson = require("./assertIsEqualJson");
const isDefined = require("./../core").isDefined;
const isInteger = require("./../core").isInteger;

module.exports = assertIsJsonResponse;

function assertIsJsonResponse(response, status, data) {
    let result;
    scope(assertIsJsonResponse.name, x => {
        assert(() => isDefined(response));
        assert(() => isInteger(status));
        assert(() => isDefined(data));
        
        assert(() => response.status === status);
        assertIsEqualJson(() => response.data, () => data);
    });
    return result;
}
