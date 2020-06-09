
const scope = require("./scope");

module.exports = getAwsApiGatewayFileName;

function getAwsApiGatewayFileName() {
    let result;
    scope(getAwsApiGatewayFileName.name, x => {
        result = 'aws-apigateway.json';
    });
    return result;
}
