
const {
    e1n3SatValidSolution,
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
} = require('../all');

scope(__filename, context => {
    let solution = [1,-2,-3];
    let clauses = [[1,2,3]];

    assert(() => e1n3SatValidSolution(clauses, solution));
});