
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

run();

async function run() {
    // TODO: Fix broken test
    let actual;
    let count = 0;
    await awsLambdaHelloWorld({},null,(a,b) => {
        count++;
        actual = b;
    });
    try {
        u.assertIsEqualJson(1, () => count);
        u.assertIsEqualJson(() => actual, () => '{"success":true,"result":"Hello, World!"}');
    } catch (e) {
        console.log({count,actual})
        throw e;
    }
}
