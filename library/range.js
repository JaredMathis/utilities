
const scope = require("./scope");
const isUndefined = require("./isUndefined");
const merge = require("./merge");
const assert = require("./assert");
const isInteger = require("./isInteger");

module.exports = range;

function range(count, start) {
    let result;
    scope(range.name, x => {
        merge(x,{count});
        merge(x,{start});
        assert(() => isInteger(count));
        assert(() => count >= 0);
        if (isUndefined(start)) {
            start = 0;
        }
        
        result = [];
        let max = start + count - 1;
        for (let i = start; i <= max; i++) {
            result.push(i);
        }
    });
    return result;
}
