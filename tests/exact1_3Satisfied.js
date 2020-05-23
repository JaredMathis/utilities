
const {
    exact1_3Satisfied,
} = require('./../sat');

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
    logIndent,
} = require('./../all');

logIndent(__filename, context => {
    let solution = [1,-2,-3];
    let clauses = [[1,2,3]];

    assert(() => exact1_3Satisfied(clauses, solution));
});