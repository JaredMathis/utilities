
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let apigateway = require("./../../" + u.getAwsApiGatewayFileName());
    let parsed = u.awsLambdaApiCall(apigateway, awsLambdaHelloWorld.name, {name:'Jared'});

    u.assertIsEqualJson(parsed, {"success":true,"result":"Hello, Jared"});
});
