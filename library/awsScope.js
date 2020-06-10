
const scope = require("./scope");
const isFunction = require("./isFunction");
const assert = require("./assert");

module.exports = awsScope;

function awsScope(name, lambda, callback) {
    try {
        scope(name, x => {
            assert(() => isFunction(callback));

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
