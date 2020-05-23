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
    merge,
    arrayMin,
    isUndefined,
    arrayAll,
} = require('./all');

const rref = require('rref');

module.exports = {
    to3Sat,
    e1n3SatValidSolution,
    e1n3SatToMatrix,
    identityPrefix,
    identityPrefixOfSize,
    e1n3SatConsistent,
    toE1n3Sat,
    toAll3Sat,
};

function isLiteral(v) {
    return isInteger(v) && v !== 0;
}

function assertIsValidClause(clause) {
    assert(() => isArray(clause));
    loop(clause, v => isLiteral(v));
    assert(() => isDistinct(clause));
}

function assertIsValidClauses(clauses) {
    scope(assertIsValidClauses.name, context => {
        merge(context, {clauses});
        assert(() => isArray(clauses));
        
        loop(clauses, c => {
            assertIsValidClause(c);
        });
    })
}

function getVariables(clauses) {
    assertIsValidClauses(clauses);

    let max = 0;
    loop(clauses, c => {
        loop(c, v => {
            if (v > max) {
                max = v;
            }
            if (-v > max) {
                max = -v;
            }
        })
    });

    return range(max, 1);
}

function getMaxVariable(clauses) {
    let max;
    
    scope(getMaxVariable.name, context => {
        assertIsValidClauses(clauses);

        let v = getVariables(clauses);
        max = arrayMax(v);    
    });
    return max;
}

/**
 * Ensures clauses have at most 3 literals
 * @param {*} clauses 
 */
function to3Sat(clauses) {
    let result;
    scope(to3Sat.name, context => {
        let log = false;

        merge(context, {clauses});

        assertIsValidClauses(clauses);

        let max = getMaxVariable(clauses);

        let newClauses = {"0":[]};
        loop(clauses, clause => {
            if (clause.length <= 2) {
                newClauses[0].push(clause);
                return;
            }
            loopPairs(clause, (a,b) => {
                let key = [a,b];
                key.sort();
                let k = JSON.stringify(key);
                if (!newClauses[k]) {
                    max++;
                    newClauses[k] = [
                        [a,b,-max],
                        [a,-b,max],
                        [-a,b,max],
                        [-a,-b,max],
                    ];
                }

                loop(clause, c => {
                    if (c === a) {
                        return;
                    } if (c === b) {
                        return;
                    }

                    if (!newClauses[c]) {
                        newClauses[c] = [];
                    }
                    newClauses[c].push([c, max]);
                });
            });
        });

        result = [];
        for (let key in newClauses) {
            let group = newClauses[key];
            for (let clause of group) {
                result.push(clause);
            }
        }

        if (log) console.log(result);

        merge(context, {newClauses});
        merge(context, {result});
        assertIs3Sat(result);
        assert(() => result.length >= clauses.length);
    });
    return result;
}

function toAll3Sat(clauses) {
    let result;
    scope(toAll3Sat.name, context => {
        c3Sat = to3Sat(clauses);

        let max = getMaxVariable(c3Sat);
        let a = max + 1;
        let b = max + 2;

        result = [];

        loop(c3Sat, c => {
            if (c.length === 3) {
                result.push(c);
                return;
            }
            if (c.length === 2) {
                result.push([c[0], c[1], a]);
                return;
            }
            if (c.length === 1) {
                result.push([c[0], b, a]);
                return;
            }
            assert(false);
        })

        assert(() => result.length >= clauses.length);
    });

    return result;
}

function assertIs3Sat(clauses) {
    scope(assertIs3Sat.name, context => {
        assertIsValidClauses(clauses);

        loop(clauses, c => {
            assert(() => c.length <= 3);
        });
    });
}

function assertIsAll3Sat(clauses) {
    scope(assertIs3Sat.name, context => {
        assertIsValidClauses(clauses);

        loop(clauses, c => {
            assert(() => c.length === 3);
        });
    });
}

function toE1n3Sat(clauses) {
    let result;
    scope(toE1n3Sat.name, context => {
        all3Sat = toAll3Sat(clauses);

        let max = getMaxVariable(all3Sat);
    
        result = [];
        loop(all3Sat, clause => {
            let x = clause[0];
            let y = clause[1];
            let z = clause[2];
            let a = ++max;
            let b = ++max;
            let c = ++max;
            let d = ++max;
            result.push([-x,a,b]);
            result.push([b,y,c]);
            result.push([c,d,-z]);
        });
    });
    return result;
}

function e1n3SatValidSolution(clauses, solution) {
    let result = true;
    scope(e1n3SatValidSolution.name, context => {
        let log = false;
        if (log) console.log({solution});
        if (log) console.log({clauses});

        assertIs3Sat(clauses);

        loop(clauses, c=> {
            let positive = arrayCount(c, v => solution.includes(v));
            let negative = arrayCount(c, v => !solution.includes(v));
    
            result = positive === 1 && negative === 2;
            if (log) console.log({c, positive, negative, result});
            if (!result) {
                return true;
            }
        });
    });

    return result;
}

function e1n3SatToMatrix(clauses) {
    let matrix = [];

    scope(e1n3SatToMatrix.name, context => {
        assertIsAll3Sat(clauses);

        let variables = getVariables(clauses);

        loop(variables, v => {
            let part = variables.map(w => w === v ? 1 : 0);
            let full = part.concat(part).concat([0]);
            matrix.push(full);
        });

        loop(clauses, c => {
            let left = variables.map(v => c.includes(v) ? 1 : 0);
            let right = variables.map(v => c.includes(-v) ? 1 : 0);
            let last = [-1];
            let full = left.concat(right).concat(last);
            matrix.push(full);
        });

    });

    return matrix;
}

function e1n3SatConsistent(clauses) {
    let log = false;
    let result = true;

    scope(e1n3SatConsistent.name, context => {
        let matrix = e1n3SatToMatrix(clauses);
        let reduced = rref(matrix);
        if (log) console.log(reduced);
        //let p = identityPrefix(reduced);

        loop(reduced, row =>{
            let inconsistent = arrayCount(row, r => r !== 0) == 1;
            if (inconsistent) {
                result = false;
                return true;
            }
        });
    });

    return result;
}

function identityPrefixOfSize(matrix, size) {
    let valid = true;

    scope(identityPrefixOfSize.name, context => {
        merge(context, {size});
        assert(() => isInteger(size));

        loop(range(size, 0), row => {
            let r = matrix[row];
            if (isUndefined(r)) {
                valid = false;
            }
            if (!valid) {
                return true;
            }
            loop(range(size, 0), col => {
                if (row === col) {
                    if (r[col] !== 1) {
                        valid = false;
                        return true;
                    }
                } else {
                    if (r[col] !== 0) {
                        valid = false;
                        return true;
                    }
                }
            });
        });
    })

    return valid;
}

function identityPrefix(matrix) {
    let result;
    scope(identityPrefix.name, context => {
        let lesser = arrayMin([matrix.length, matrix[0].length]);
        loop(range(lesser + 1), size=> {
            if (identityPrefixOfSize(matrix, size)) {
                result = size;
            } else {
                return true;
            }
        });
    });
    return result;
}