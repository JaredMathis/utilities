require('./tests/isArrayIndex');
require('./tests/arrayCount');
require('./tests/to3Sat');
require('./tests/e1n3SatValidSolution');
require('./tests/gauss');
require('./tests/rref');
require('./tests/e1n3SatToMatrix');
require('./tests/identityPrefixOfSize');
require('./tests/identityPrefix');
require('./tests/toAll3Sat');
require('./tests/e1n3SatConsistent');
require('./tests/toE1n3Sat');
require('./tests/stringSuffix');
require('./tests/deleteDirectory/test.js');
require('./tests/copyFiles/test.js');
require('./tests/getPackageVersion/test.js');
require('./tests/bumpPackageVersion/test.js');
require('./tests/fn/fn.js');

let external = false;
if (external) {
    process.chdir('../bible');
    require('../bible/build');
    
    process.chdir('../grammars2');
    require('../grammars2/test');
}