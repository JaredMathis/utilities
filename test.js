require('./tests/isArrayIndex');
require('./tests/arrayCount');
require('./tests/to3Sat');
require('./tests/exact1_3Satisfied');
require('./tests/gauss');

let external = false;
if (external) {
    process.chdir('../bible');
    require('../bible/build');
    
    process.chdir('../grammars2');
    require('../grammars2/test');
}