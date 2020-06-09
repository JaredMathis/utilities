
const scope = require("./scope");

module.exports = awsLambdaHelloWorld;

function awsLambdaHelloWorld(event, context, callback) {
    let result;
    scope(awsLambdaHelloWorld.name, x => {
        result = 'Hello, World!';
    });
    return callback(null, JSON.stringify({result}));
}
