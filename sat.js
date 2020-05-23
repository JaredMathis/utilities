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
    merge,
} = require('./all');

module.exports = {
    to3Sat,
    exact1_3Satisfied,
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
    logIndent(assertIsValidClauses.name, context => {
        merge(context, {clauses});
        assert(() => isArray(clauses));
        
        loop(clauses, c => {
            assertIsValidClause(c);
        });
    })
}

function vertices(clauses) {
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
    
    logIndent(getMaxVariable.name, context => {
        assertIsValidClauses(clauses);

        let v = vertices(clauses);
        max = arrayMax(v);    
    });
    return max;
}

function to3Sat(clauses) {
    let result;
    logIndent(to3Sat.name, context => {
        let log = false;

        merge(context, {clauses});

        assertIsValidClauses(clauses);

        let max = getMaxVariable(clauses);

        let newClauses = {};
        loop(clauses, clause => {
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
    });
    return result;
}

function assertIs3Sat(clauses) {
    logIndent(assertIs3Sat.name, context => {
        assertIsValidClauses(clauses);

        loop(clauses, c => {
            assert(() => c.length <= 3);
        });
    });
}

function toExact1_3Sat(clauses) {
    clauses = to3Sat(clauses);

    let max = getMaxVariable(clauses);

    let result = [];
    loop(clauses, c => {
        let x = c[0];
        let y = c[1];
        let z = c[2];
        let a = ++max;
        let b = ++max;
        let c = ++max;
        let d = ++max;
        result.push([-x,a,b]);
        result.push([b,y,c]);
        result.push([c,d,-z]);
    });
}

function exact1_3Satisfied(clauses, solution) {
    let result = true;
    logIndent(exact1_3Satisfied.name, context => {
        let log = true;
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