const {
    identityPrefixOfSize,
} = require('../sat');

const {
    scope,
    assertIsEqualJson,
    assertIsEqual,
    merge,
} = require('../index');

scope(__filename, context => {

    let m;

    m = [];
    merge(context, {m})
    assertIsEqual(identityPrefixOfSize(m, 0), true);
    assertIsEqual(identityPrefixOfSize(m, 1), false);
    m = [[1]];
    merge(context, {m})
    assertIsEqual(identityPrefixOfSize(m, 0), true);
    assertIsEqual(identityPrefixOfSize(m, 1), true);
    assertIsEqual(identityPrefixOfSize(m, 2), false);
    m = [
        [1,0],
        [0,1]];
    merge(context, {m})
    assertIsEqual(identityPrefixOfSize(m, 0), true);
    assertIsEqual(identityPrefixOfSize(m, 1), true);
    assertIsEqual(identityPrefixOfSize(m, 2), true);
    assertIsEqual(identityPrefixOfSize(m, 3), false);
    m = [
        [1,1],
        [0,1]];
    merge(context, {m})
    assertIsEqual(identityPrefixOfSize(m, 0), true);
    assertIsEqual(identityPrefixOfSize(m, 1), true);
    assertIsEqual(identityPrefixOfSize(m, 2), false);
    assertIsEqual(identityPrefixOfSize(m, 3), false);
    m = [
        [1,0,0],
        [0,1,0],
        [0,0,1]];
    merge(context, {m})
    assertIsEqual(identityPrefixOfSize(m, 0), true);
    assertIsEqual(identityPrefixOfSize(m, 1), true);
    assertIsEqual(identityPrefixOfSize(m, 2), true);
    assertIsEqual(identityPrefixOfSize(m, 3), true);
    assertIsEqual(identityPrefixOfSize(m, 4), false);

    m = [
        [1,0,0,0,0,0,1],
        [0,1,0,0,0,0,-1],
        [0,0,1,0,0,0,-1],
        [0,0,0,1,0,0,-1],
        [0,0,0,0,1,0,1],
        [0,0,0,0,0,1,1]
    ];
    merge(context, {m})
    assertIsEqual(identityPrefixOfSize(m, 0), true);
    assertIsEqual(identityPrefixOfSize(m, 1), true);
    assertIsEqual(identityPrefixOfSize(m, 2), true);
    assertIsEqual(identityPrefixOfSize(m, 3), true);
    assertIsEqual(identityPrefixOfSize(m, 4), true);
    assertIsEqual(identityPrefixOfSize(m, 5), true);
    assertIsEqual(identityPrefixOfSize(m, 6), true);
    assertIsEqual(identityPrefixOfSize(m, 7), false);
});