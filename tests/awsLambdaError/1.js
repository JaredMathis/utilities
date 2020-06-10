
const u = require("../../index");
const request = require("sync-request");

const awsLambdaError = require("../../library/awsLambdaError.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let deploy = true;

    console.log(__filename);
    if (deploy) {
        u.executeCommand(`node u awsDeployLambda ${awsLambdaError.name}`);
    }

    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let parsed = u.awsLambdaApiCall(apigateway, awsLambdaError.name);

    u.assert(() => parsed.success === false);
    u.assert(() => u.isArray(parsed.messages));
    u.assert(() => parsed.messages[0] === `${awsLambdaError.name} entered`);
});
