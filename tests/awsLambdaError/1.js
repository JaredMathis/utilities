
const u = require("../../index");
const request = require("sync-request");

const awsLambdaError = require("../../library/awsLambdaError.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let parsed = u.awsLambdaApiCall(apigateway, awsLambdaError.name);
    u.merge(x, parsed);

    u.assert(() => parsed.success === false);
    u.assert(() => u.isArray(parsed.error.e.context));
    u.assert(() => parsed.error.e.context[0] === `assert entered`);
});
