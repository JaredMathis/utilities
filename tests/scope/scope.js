
const u = require("../../index");

const scope = require("../../library/scope.js");

let log = false;

if (log) console.log('Entered ' + __filename);

let arrived = false;

scope(__filename, x => {
    try {
        let b = 1;
        u.merge(x, {b})
        scope('a', y => {
            let c = 2;
            u.merge(y, {c});
            
            scope('d', y => {
                let e = 2;
                u.merge(y, {e});
                
                u.assert(false);
            });
        });
    } catch (e) {
        let expected = '{"name":"a","context":{"c":2},"innerError":{"name":"d","context":{"e":2},"innerError":{"name":"assert","context":{"b":false,"bValue":false},"innerError":{}}}}';
        u.merge(x, {expected});
        let actual = JSON.stringify(e);
        u.merge(x, {actual});
        if (actual !== expected) {
            throw new Error('actual does not equal expected');
        }

        arrived = true;
    }
});

if (!arrived) {
    throw new Error('Did not arrive');
}

if (log) console.log('Leaving ' + __filename);