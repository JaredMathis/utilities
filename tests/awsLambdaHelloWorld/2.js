
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

const cl = require('../../library/commandLine');

const request = require('sync-request');

u.scope(__filename, x => {
    let deploy = true;

    console.log(__filename);
    if (deploy) {
        u.executeCommand(`node u awsDeployLambda ${awsLambdaHelloWorld.name}`);
    }

    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let parsed = u.awsLambdaApiCall(apigateway, awsLambdaHelloWorld.name);

    u.assertIsEqualJson(parsed, {"success":true,"result":"Hello, World!"});
});
