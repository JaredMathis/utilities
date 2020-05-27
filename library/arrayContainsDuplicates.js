
const scope = require("./scope");
const isArray = require("./isArray");
const assert = require("./assert");
const merge = require("./merge");
const range = require("./range");

module.exports = arrayContainsDuplicates;

function arrayContainsDuplicates(array) {
    let log = false;
    let result;
    scope(arrayContainsDuplicates.name, x => {
        merge(x,{array});
        assert(() => isArray(array));

        for (let i of range(array.length)) {
            merge(x,{i});
            for (let j of range(array.length)) {
                if (j <= i) {
                    continue;
                }

                if (array[i] === array[j]) {
                    if (log) console.log('arrayContainsDuplicates', { i,j })
                    result = true;
                    return;
                }
            }
        }

        if (log) console.log('arrayContainsDuplicates false');
        result = false;
    });
    return result;
}
