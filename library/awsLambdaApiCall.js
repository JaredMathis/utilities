
const scope = require("./scope");
const assertIsString = require("./assertIsString");
const assert = require("./assert");
const merge = require("./merge");
const isDefined = require("./isDefined");
const request = require("sync-request");

module.exports = awsLambdaApiCall;

function awsLambdaApiCall(apigateway, lambdaName) {
    let result;
    scope(awsLambdaApiCall.name, x => {
        merge(x, {lambdaName});
        assertIsString(() => lambdaName);

        let apiId = apigateway[lambdaName]["default"];
    
        let response = request('POST', `https://${apiId}.execute-api.us-east-1.amazonaws.com/prod`);
        let json = response.body.toString();
        merge(x, {json});
        let parsed = JSON.parse(JSON.parse(json));
        merge(x, {parsed});

        assert(() => isDefined(parsed));
        result = parsed;
    });
    return result;
}
