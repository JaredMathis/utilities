const awsScope = require("./awsScope");
const assert = require("./assert");
const merge = require("./merge");

module.exports = awsLambdaError;

function awsLambdaError(event, context, callback) {
    awsScope(awsLambdaError.name, x => {
        merge(x, { a: 123 });
        assert(false);
    }, callback);
}
