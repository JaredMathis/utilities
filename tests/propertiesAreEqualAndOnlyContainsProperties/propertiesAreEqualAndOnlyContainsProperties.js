
const u = require("../../index");

const propertiesAreEqualAndOnlyContainsProperties = require("../../library/propertiesAreEqualAndOnlyContainsProperties.js");

u.scope(__filename, x => {
    u.assert(() => propertiesAreEqualAndOnlyContainsProperties({a:1}, {a:1}, ['a']));
    u.assert(() => propertiesAreEqualAndOnlyContainsProperties({a:1,b:2}, {b:2,a:1}, ['a', 'b']));
    u.assert(() => !propertiesAreEqualAndOnlyContainsProperties({a:1,b:2}, {b:2,a:2}, ['a', 'b']));
    u.assert(() => u.throws(() => propertiesAreEqualAndOnlyContainsProperties({a:1,b:2}, {b:2,a:1,c:3}, ['a', 'b'])));
    u.assert(() => u.throws(() => propertiesAreEqualAndOnlyContainsProperties({a:1,b:2}, {b:2,a:1}, ['a', 'b', 'c'])));
    u.assert(() => u.throws(() => propertiesAreEqualAndOnlyContainsProperties({a:1,b:2}, {b:2,a:1}, ['a'])));
});
