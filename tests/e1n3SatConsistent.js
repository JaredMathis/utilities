const {
    e1n3SatConsistent,
    toE1n3Sat,
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
    merge,
    logIndent,
} = require('../all');

logIndent(__filename, context => {
    let clauses;
    
    // No solution
    clauses = [
        [1],
        [-1],
    ];
    clauses = toE1n3Sat(clauses);
    merge(context, {clauses});
    let done = false;
    if (done) assert(() => !e1n3SatConsistent(clauses));

    clauses = [[1,2,3]];
    merge(context, {clauses});
    assert(() => e1n3SatConsistent(clauses));
    
    clauses = [
        [1,2,3],
        [-1,2,3],
    ];
    merge(context, {clauses});
    assert(() => !e1n3SatConsistent(clauses));

    // Only solution is 1,2,3
    clauses = [
        [1,2,3],
        [1,2,-3],
        [1,-2,3],
        [1,-2,-3],
        [-1,2,3],
        [-1,2,-3],
        [-1,-2,3],
        //[-1,-2,-3]
    ];
    merge(context, {clauses});
    assert(() => e1n3SatConsistent(toE1n3Sat(clauses)));
});