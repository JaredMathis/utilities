
const u = require("../../all");

const assertOnlyContainsProperties = require("../../library/assertOnlyContainsProperties.js");

u.scope(__filename, x => {
    assertOnlyContainsProperties({"a": 1}, ["a"]);
    assertOnlyContainsProperties({"a": 1, 'b': 2}, ['b', "a"]);
    assertOnlyContainsProperties({"a": 1, 'b': 2}, ["a", 'b']);
    assertOnlyContainsProperties({"b": 1, 'a': 2}, ["a", 'b']);
    u.assert(() => u.throws(() => assertOnlyContainsProperties({"a": 1}, ["a", "b"])));
    u.assert(() => u.throws(() => assertOnlyContainsProperties({"a": 1, "b":1}, ["a"])));
});
