const {
    e1n3SatConsistent,
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
    
    clauses = [[1,2,3]];
    merge(context, {clauses});
    assert(() => e1n3SatConsistent(clauses));
    
    clauses = [
        [1,2,3],
        [-1,2,3],
    ];
    merge(context, {clauses});
    assert(() => !e1n3SatConsistent(clauses));
});