
const u = require("../../index");

const propertiesAreEqual = require("../../library/propertiesAreEqual.js");

u.scope(__filename, x => {
    u.assert(() => propertiesAreEqual({a:1}, {a:1}, ['a']));
    u.assert(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1}, ['a', 'b']));
    u.assert(() => !propertiesAreEqual({a:1,b:2}, {b:2,a:2}, ['a', 'b']));
    u.assert(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1,c:3}, ['a', 'b']));
    u.assert(() => !propertiesAreEqual({a:1,b:2}, {b:3,a:1,c:3}, ['a', 'b']));
    u.assert(() => !propertiesAreEqual({a:1,b:2}, {b:2,a:2,c:3}, ['a', 'b']));
    u.assert(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1}, ['a', 'b', 'c']));
    u.assert(() => propertiesAreEqual({a:1,b:2}, {b:2,a:1}, ['a']));
    u.assert(() => !propertiesAreEqual({a:3,b:2}, {b:2,a:1}, ['a']));

});
