
const scope = require("./scope");

module.exports = stringTrimLambdaPrefix;

function stringTrimLambdaPrefix(s) {
    let result = s;

    result = result.trim();

    let parenthesis = "()";
    if (result.startsWith(parenthesis)){
        result = result.substring(parenthesis.length); 
    }
    result = result.trim();

    let arrow = "=>";

    if (result.startsWith(arrow)){
        result = result.substring(arrow.length); 
    }
    result = result.trim();

    return result;
}
