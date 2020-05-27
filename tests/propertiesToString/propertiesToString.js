
const u = require("../../index");

const propertiesToString = require("../../library/propertiesToString.js");

u.scope(__filename, x => {
    let a = "123";
    let b = "456";
    let c = "789";
    let actual = propertiesToString({a,b,c})
    let expected = ["{\"a\":\"123\"}","{\"b\":\"456\"}","{\"c\":\"789\"}"];
    u.merge(x, {actual});
    u.merge(x, {expected});
    u.assertIsEqualJson(()=>actual, ()=>expected);

    actual = propertiesToString({a,b,c}, ' ')
    expected = [" {\"a\":\"123\"}"," {\"b\":\"456\"}"," {\"c\":\"789\"}"];
    u.merge(x, {actual});
    u.merge(x, {expected});
    u.assertIsEqualJson(()=>actual, ()=>expected);
});
