
const scope = require("./scope");
const isFunction = require("./isFunction");
const assert = require("./assert");

module.exports = awsScope;

async function awsScope(lambda, callback) {
    let context = {};
    try {
        assert(() => isFunction(callback));
        
        let promise = lambda(context);

        let result = await Promise.resolve(promise)

        callback(null, JSON.stringify({
            success: true,
            context,
            result,
        }))
    } catch (e) {
        callback(null, JSON.stringify({
            success: false,
            context,
            error: {
                string: e.toString(),
                stack: e.stack,
                e,
            }
        }));
    }
}
