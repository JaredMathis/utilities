const {
    scope,
    arrayCount,
    assertIsEqual,
    stringSuffix,
} = require('../index');

scope(__filename, context => {
    assertIsEqual(() => stringSuffix('abc', 1), 'c');
    assertIsEqual(() => stringSuffix('abc', 2), 'bc');
    assertIsEqual(() => stringSuffix('abc', 3), 'abc');
});