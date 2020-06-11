
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

const cl = require('../../library/commandLine');

const request = require('sync-request');

u.scope(__filename, x => {
    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let parsed = u.awsLambdaApiCall(apigateway, awsLambdaHelloWorld.name, {}, x);

    u.assertIsEqualJson(parsed, {"success":true,"context":{},"result":"Hello, World!"});
});
