

const {
    e1n3SatToMatrix,
} = require('../sat');

const {
    loop,
    assert,
    isArray,
    isDistinct,
    isInteger,
    loopPairs,
    range,
    arrayMax,
    arrayCount,
    scope,
    assertIsEqualJson,
} = require('../all');

scope(__filename, context => {
    let solution = [1,-2,-3];
    let clauses = [
        [1,2,3],
        [-2,2,3],
        [2,3,-3],
    ];

    let actual = e1n3SatToMatrix(clauses);
    let expected = [
        [1, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0, 0, -1],
        [0, 1, 1, 0, 1, 0, -1],
        [0, 1, 1, 0, 0, 1, -1],
    ];
    assertIsEqualJson(actual, expected)

});
