
const u = require("../../index");
const request = require("sync-request");

const awsLambdaError = require("../../library/awsLambdaError.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let deploy = true;

    if (deploy) {
        console.log(__filename);
        u.executeCommand(`node u awsDeployLambda ${awsLambdaError.name}`);
    }

    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let apiId = apigateway[awsLambdaError.name]["default"];

    let result = request('POST', `https://${apiId}.execute-api.us-east-1.amazonaws.com/prod`);
    let json = result.body.toString();
    u.merge(x, {json});
    let parsed = JSON.parse(JSON.parse(json));
    u.merge(x, {parsed});

    u.assert(() => parsed.success === false);
    u.assert(() => u.isArray(parsed.messages));
    u.assert(() => parsed.messages[0] === `${awsLambdaError.name} entered`);
});
