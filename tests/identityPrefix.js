const {
    identityPrefix,
} = require('../sat');

const {
    scope,
    assertIsEqualJson,
    assertIsEqual,
    merge,
} = require('../index');

scope(__filename, context => {

    let m;

    m = [
        [1,0,0,0,0,0,1],
        [0,1,0,0,0,0,-1],
        [0,0,1,0,0,0,-1],
        [0,0,0,1,0,0,-1],
        [0,0,0,0,1,0,1],
        [0,0,0,0,0,1,1]
    ];
    merge(context, {m});
    assertIsEqual(identityPrefix(m), 6);

    m = [
        [1,0,0,0,-1,0,0],
        [0,1,0,0,1,0,0],
        [0,0,1,0,0,0,-1],
        [0,0,0,1,1,0,0],
        [0,0,0,0,0,1,1]
    ];
    merge(context, {m});
    assertIsEqual(identityPrefix(m), 4);

    m = [
        [1,0,0,0,-1,0,0],
        [0,1,0,0,1,0,0],
        [0,0,1,0,0,0,-1],
        [0,0,0,1,1,0,0],
        [0,0,0,0,0,1,1]
    ];
    merge(context, {m});
    assertIsEqual(identityPrefix(m), 4);

    m = [
        [1,0,0,0,0,0,0],
        [0,1,0,0,0,-1,-1],
        [0,0,1,0,0,1,0],
        [0,0,0,1,0,0,0],
        [0,0,0,0,1,1,1]
    ];
    merge(context, {m});
    assertIsEqual(identityPrefix(m), 5);

    m = [
        [1,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,1,0,0,0,-1],
        [0,0,0,1,0,0,0],
        [0,0,0,0,1,0,0],
        [0,0,0,0,0,1,1]
    ];
    merge(context, {m});
    assertIsEqual(identityPrefix(m), 6);

    m = [
        [ 1, 0, 0, 0, 0, 0, 0 ],
        [ 0, 1, 0, 0, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0, 0, 0 ],
        [ 0, 0, 0, 1, 0, 0, 0 ],
        [ 0, 0, 0, 0, 1, 0, 0 ],
        [ 0, 0, 0, 0, 0, 1, 0 ],
        [ 0, 0, 0, 0, 0, 0, 1 ]
    ];
    merge(context, {m});
    assertIsEqual(identityPrefix(m), 7);
});