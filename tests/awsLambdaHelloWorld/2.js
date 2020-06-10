
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

const cl = require('../../library/commandLine');

const request = require('sync-request');

u.scope(__filename, x => {
    let deploy = true;
    if (deploy) {
        console.log(__filename);
        u.executeCommand(`node u awsDeployLambda ${awsLambdaHelloWorld.name}`);
    }

    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let apiId = apigateway[awsLambdaHelloWorld.name]["default"];

    let result = request('POST', `https://${apiId}.execute-api.us-east-1.amazonaws.com/prod`);
    let json = result.body.toString();
    u.merge(x, {json});
    let parsed = JSON.parse(JSON.parse(json));
    u.merge(x, {parsed});

    u.assertIsEqualJson(parsed, {"success":true,"result":"Hello, World!"});
});
