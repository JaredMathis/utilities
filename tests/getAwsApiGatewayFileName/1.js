
const u = require("../../index");

const getAwsApiGatewayFileName = require("../../library/getAwsApiGatewayFileName.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assert(getAwsApiGatewayFileName() === 'aws-apigateway.json');
});
