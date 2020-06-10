
const awsScope = require("./awsScope");

module.exports = awsLambdaHelloWorld;

async function awsLambdaHelloWorld(event, context, callback) {
    await awsScope(async x => {
        if (event.name)
            return `Hello, ${event.name}`;
        return 'Hello, World!';
    }, callback);
}
