const {
    isFunction,
} = require("./../core");

const {
    scope,
} = require("./../log");

const {
    assert,
} = require("./../assert");

module.exports = throws;

function throws(lambda) {
    let result;
    scope(throws.name, x => {
        assert(() => isFunction(lambda));
        try {
            lambda();
            result = false;
            return;
        } catch (e) {
            result = true;
            return;
        }
    });
    return result;
}
