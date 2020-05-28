
const u = require("../../index");

const stringTrimLambdaPrefix = require("../../library/stringTrimLambdaPrefix.js");

u.scope(__filename, x => {
    u.assert(() => stringTrimLambdaPrefix("()=>{}") === "{}");
    u.assert(() => stringTrimLambdaPrefix("() =>{}") === "{}");
    u.assert(() => stringTrimLambdaPrefix("() => {}") === "{}");
    u.assert(() => stringTrimLambdaPrefix(" () => {}") === "{}");
    u.assert(() => stringTrimLambdaPrefix("  () => {}") === "{}");
    u.assert(() => stringTrimLambdaPrefix("  ()=> {}") === "{}");
    u.assert(() => stringTrimLambdaPrefix("  ()=>{}") === "{}");
});
