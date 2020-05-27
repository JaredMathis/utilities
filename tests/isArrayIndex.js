const {
    scope,
    isArrayIndex,
    assertIsEqual
} = require('../index');

scope(__filename, context => {
    assertIsEqual(() => isArrayIndex([], 0), false);
    assertIsEqual(() => isArrayIndex([1], 0), true);
    assertIsEqual(() => isArrayIndex([1], 1), false);
    assertIsEqual(() => isArrayIndex([1,2], 0), true);
    assertIsEqual(() => isArrayIndex([1,2], 1), true);
    assertIsEqual(() => isArrayIndex([1,2], 2), false);
    assertIsEqual(() => isArrayIndex('12', 0), true);
    assertIsEqual(() => isArrayIndex('12', 1), true);
    assertIsEqual(() => isArrayIndex('12', 2), false);
});