const { 
    toAll3Sat,
} = require('../sat');

const {
    scope,
    assertIsEqualJson,
} = require('../index');

scope(__filename, context => {
    let clauses;
    let result;

    clauses = [[1]];
    result = toAll3Sat(clauses);
    assertIsEqualJson(result, () => [[1,3,2]]);

    clauses = [[1],[-1]];
    result = toAll3Sat(clauses);
    assertIsEqualJson(result, () => [[1,3,2],[-1,3,2]]);
})