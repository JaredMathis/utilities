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
    let s = system.solution.map(s => s.toNumber());
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
    assertIsEqualJson(solution, [-2,3,0]);

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
    assertIsEqualJson(() => solution, [1,-1,-1,-1,1,1])

    $A = [
        [1],
    ];
    $x = [1];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [1])

    $A = [
        [1, 1],
    ];
    $x = [1, 2];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [-1,2])

    $A = [
        [1, 1, 1],
    ];
    $x = [1, 2, 3];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [-4,2,3]);

    $A = [
        [1, 1, 2],
        [1, 2, 2],
    ];
    $x = [1, 1, 1];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [-1,0,1]);

    $A = [
        [1, 0],
        [0, 1],
        [1, 0],
        [0, 1],
    ];
    $x = [0, 0, 0, 0];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [0,0]);

    $A = [
        [1, 0],
        [0, 1],
        [1, 0],
        [0, 1],
    ];
    $x = [1, 1, 1, 1];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [1,1]);

    $A = [[1, 1], [2, 1]];
    $x = [10, 16];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [6,4]);

    $A = [
        [1, 0, 1, 0],
        [0, 1, 0, 1],
    ];
    $x = [1, 1, 1, 1];
    solution = gauss($A, $x);
    assertIsEqualJson(() => solution, [0,0,1,1]);
})