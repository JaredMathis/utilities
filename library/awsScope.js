
const scope = require("./scope");

module.exports = awsScope;

function awsScope(name, lambda, callback) {
    try {
        scope(name, lambda);
    } catch (e) {
        callback(null, JSON.stringify({
            success: false,
            messages: e.context
        }));
    }
}
