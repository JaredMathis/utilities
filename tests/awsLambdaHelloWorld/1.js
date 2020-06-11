
const u = require("../../index");

const awsLambdaHelloWorld = require("../../library/awsLambdaHelloWorld.js");
const index = require("../../index.js");

run();

async function run() {
    let actual;
    let count = 0;
    await awsLambdaHelloWorld({},null,(a,b) => {
        count++;
        actual = b;
    });
    try {
        u.assertIsEqualJson(1, () => count);
        u.assertIsEqualJson(() => actual, () => '{"success":true,"context":{},"result":"Hello, World!"}');
    } catch (e) {
        console.log({__filename,count,actual})
        throw e;
    }
}
