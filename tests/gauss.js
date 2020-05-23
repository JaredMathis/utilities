const GaussianElimination = require('na-gaussian-elimination');
const BigNumber = require('bignumber.js');

const {
    logIndent,
    assertIsEqualJson,
    assertIsEqual,
} = require('../all');

function arrayToBigNumber(array) {
    let result = array.map(a => new BigNumber(a));
    return result;
}

function matrixToBigNumber(matrix) {
    let result = matrix.map(a => arrayToBigNumber(a));
    return result;
}

function gauss(matrix, result) {
    var system = new GaussianElimination().solve(
        matrixToBigNumber(matrix), 
        arrayToBigNumber(result));
    let s = system.solution.map(s => s.toFixed());
    return s;
}

logIndent(__filename, context => {
    var matrix = [
        [(1), (2), (3)],
        [(4), (5), (6)],
        [(7), (8), (12)]
    ];
    var result = [
        (4), (7), (10)
    ];
    
    solution = gauss(matrix, result);
    assertIsEqualJson(solution, ["-1.99999999999999999994","2.99999999999999999995","0"]);

    $A = [
        [1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0],
        [0, 1, 1, 0, 0, 1],
    ];
    $x = [0, 0, 0, -1, -1, -1];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, ["1","-1","-1","-1","1","1"])
})