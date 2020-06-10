
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    // TODO: Fix broken test
    let actual;
    awsLambdaHelloWorld(null,null,(a,b) => actual = b);
    u.merge(x,{actual});
    u.assertIsEqualJson(() => actual, () => JSON.stringify({"success":false,"messages":{}}));
});
