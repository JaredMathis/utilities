
const u = require("../../index");

const assert = require("../../library/assert.js");

u.scope(__filename, x => {
    try {
        assert(true);
    } catch (e) {
        error();
    }
    try {
        assert(() => true);
    } catch (e) {
        error();
    }
    try {
        assert(false);
        error();
    } catch (e) {
    }
    try {
        assert(() => false);
        error();
    } catch (e) {
    }
});

function error() {
    throw new Error('error: ' + __filename);
}