
const scope = require("./scope");

module.exports = awsScope;

function awsScope(name, lambda, callback) {
    try {
        scope(name, x => {
            let result = lambda(x);
            callback(null, JSON.stringify({
                success: true,
                result
            }))
        });
    } catch (e) {
        callback(null, JSON.stringify({
            success: false,
            messages: e.context
        }));
    }
}
