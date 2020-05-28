
const u = require("../../index");

const merge = require("../../library/merge.js");
const isFunction = require("../../library/isFunction.js");
const stringTrimLambdaPrefix = require("../../library/stringTrimLambdaPrefix.js");

u.scope(__filename, x => {
    // TODO

    let a = {};
    let lambda = ()=>1+2;
    u.assert(() => u.isFunction(lambda));

    let bValue;
    if (isFunction(lambda)) {
        bValue = {};
        let key = stringTrimLambdaPrefix(lambda.toString());
        bValue[key] = lambda();
    } 

    u.assert(() => u.isFunction(lambda));
    u.assertIsEqualJson(() => bValue, {"1+2":3});

    merge(a, lambda);
    u.assertIsEqualJson(() => a, {"1+2":3});
});
