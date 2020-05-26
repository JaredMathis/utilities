
const u = require("../../all");

const propertiesAreEqual = require("../../library/propertiesAreEqual.js");

u.scope(__filename, x => {
    u.assert(() => propertiesAreEqual({a:1}, {a:1}, ['a']));
    u.assert(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1}, ['a', 'b']));
    u.assert(() => !propertiesAreEqual({a:1,b:2}, {b:2,a:2}, ['a', 'b']));
    u.assert(() => u.throws(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1,c:3}, ['a', 'b'])));
    u.assert(() => u.throws(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1}, ['a', 'b', 'c'])));
    u.assert(() => u.throws(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1}, ['a'])));
});
