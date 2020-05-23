const {
    scope,
    arrayCount,
    assertIsEqual
} = require('../all');

scope(__filename, context => {
    let solution = [ 1, -2, -3 ];
    assertIsEqual(() => arrayCount([ 1, 2, 3 ], v => solution.includes(v)), 1);
    assertIsEqual(() => arrayCount([ 1, 2, 3 ], v => !solution.includes(v)), 2);
});