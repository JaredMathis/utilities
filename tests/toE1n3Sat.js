const { 
    toE1n3Sat,
} = require('../sat');

const {
    logIndent,
    assertIsEqualJson,
} = require('../all');

logIndent(__filename, context => {
    let clauses = [[1],[-1]];
    let result = toE1n3Sat(clauses);
    assertIsEqualJson(result, () => 
    [[-1,4,5],[5,3,6],[6,7,-2],[1,8,9],[9,3,10],[10,11,-2]]);
})