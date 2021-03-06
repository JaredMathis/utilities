
const scope = require("./scope");
const assertIsString = require("./assertIsString");
const assert = require("./assert");
const merge = require("./merge");
const isDefined = require("./isDefined");
const request = require("sync-request");

module.exports = awsLambdaApiCall;

function awsLambdaApiCall(apigateway, lambdaName, jsonBody, context) {
    let result;
    scope(awsLambdaApiCall.name, x => {
        merge(x, { lambdaName });
        assertIsString(() => lambdaName);
        assert(() => isDefined(context));

        let apiId = apigateway[lambdaName]["default"];

        let response = request(
            'POST',
            `https://${apiId}.execute-api.us-east-1.amazonaws.com/prod`,
            {
                json: jsonBody || {},
            });
        let json = response.body.toString();
        merge(x, { json });
        let parsed = JSON.parse(json);
        merge(x, { parsed });
        try {
            parsed = JSON.parse(parsed);
        } catch (e) {
            console.log(__filename, { parsed });
            throw e;
        }
        merge(x, { parsed });

        assert(() => isDefined(parsed));
        result = parsed;

        if (parsed.success === false) {
            console.log(JSON.stringify({parsed}, null, 2));
        }
    });
    return result;
}
