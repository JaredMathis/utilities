
const scope = require("./scope");
const isFunction = require("./isFunction");

module.exports = unwrapIfLambda;

function unwrapIfLambda(input) {
    let result;
    scope(unwrapIfLambda.name, x => {
        if (isFunction(input)) {
            result = input();
        } else {
            result = input;
        }
    });
    return result;
}
