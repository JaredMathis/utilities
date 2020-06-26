const assert = require('./assert');
const isFunction = require('./isFunction');
const scope = require('./scope');
const merge = require('./merge');

module.exports = args;

function args() {
    scope(args.name, x => {
        let expectedCount = arguments.length - 1;
        let a = arguments[0];
        merge(x, {a, expectedCount});

        assert(() => a.length === expectedCount);
        for (let i = 0; i < a.length; i++) {
            let type = arguments[i + 1]
            merge(x, () => a[i]);
            merge(x, {type});
            assert(() => isFunction(type), {arguments});
            assert(() => type(a[i]));
        }
    });
}