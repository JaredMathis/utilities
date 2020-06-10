
const awsScope = require("./awsScope");

module.exports = awsLambdaHelloWorld;

function awsLambdaHelloWorld(event, context, callback) {
    awsScope(awsLambdaHelloWorld.name, x => {
        if (event.name)
            return `Hello, ${event.name}`;
        return 'Hello, World!';
    }, callback);
}
