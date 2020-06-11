const awsScope = require("./awsScope");
const merge = require("./merge");
const assert = require("./assert");

module.exports = awsLambdaError;

function awsLambdaError(event, context, callback) {
    awsScope(x => {
        merge(x, { asdf: 1234 });
        assert(false);
    }, callback);
}
