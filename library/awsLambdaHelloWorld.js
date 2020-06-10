
const awsScope = require("./awsScope");

module.exports = awsLambdaHelloWorld;

function awsLambdaHelloWorld(event, context, callback) {
    awsScope(awsLambdaHelloWorld.name, x => {
        return 'Hello, World!';
    }, callback);
}
