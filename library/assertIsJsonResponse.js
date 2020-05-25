const scope = require("./scope");
const assert = require("./assert");
const merge = require("./../log").merge;
const isDefined = require("./../core").isDefined;
const isFunction = require("./../core").isFunction;
const isInteger = require("./../core").isInteger;

module.exports = assertIsJsonResponse;

function assertIsJsonResponse(response, status, body) {
    let result;
    scope(assertIsJsonResponse.name, x => {
        merge(x, {response});
        merge(x, {status});
        merge(x, {body});

        assert(() => isDefined(response));
        assert(() => isInteger(status));
        assert(() => isDefined(body));
        
        assert(() => response.statusCode === status);
        assert(() => isDefined(response.body));
        assert(() => isFunction(response.body.toString));

        let actualJson = response.body.toString();
        merge(x, {actualJson});

        let expectedJson = JSON.stringify(body);
        merge(x, {expectedJson});

        assert(() => actualJson === expectedJson);
    });
    return result;
}
