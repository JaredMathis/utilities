const { 
    to3Sat,
} = require('../sat');

const {
    scope,
    assertIsEqualJson,
} = require('../index');

scope(__filename, context => {
    let clauses;
    let result;

    clauses = [[1,2,3,4]];
    result = to3Sat(clauses);
    assertIsEqualJson(result, () => 
    [
        [ 1, 8 ],
        [ 1, 9 ],
        [ 1, 10 ],
        [ 2, 6 ],
        [ 2, 7 ],
        [ 2, 10 ],
        [ 3, 5 ],
        [ 3, 7 ],
        [ 3, 9 ],
        [ 4, 5 ],
        [ 4, 6 ],
        [ 4, 8 ],
        [ 1, 2, -5 ],
        [ 1, -2, 5 ],
        [ -1, 2, 5 ],
        [ -1, -2, 5 ],
        [ 1, 3, -6 ],
        [ 1, -3, 6 ],
        [ -1, 3, 6 ],
        [ -1, -3, 6 ],
        [ 1, 4, -7 ],
        [ 1, -4, 7 ],
        [ -1, 4, 7 ],
        [ -1, -4, 7 ],
        [ 2, 3, -8 ],
        [ 2, -3, 8 ],
        [ -2, 3, 8 ],
        [ -2, -3, 8 ],
        [ 2, 4, -9 ],
        [ 2, -4, 9 ],
        [ -2, 4, 9 ],
        [ -2, -4, 9 ],
        [ 3, 4, -10 ],
        [ 3, -4, 10 ],
        [ -3, 4, 10 ],
        [ -3, -4, 10 ]
    ]);

    clauses = [[1]];
    result = to3Sat(clauses);
    assertIsEqualJson(result, () => [[1]]);

    clauses = [[1],[-1]];
    result = to3Sat(clauses);
    assertIsEqualJson(result, () => [[1],[-1]]);
})