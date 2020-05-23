require('./tests/isArrayIndex');
require('./tests/arrayCount');
require('./tests/to3Sat');
require('./tests/exact1_3Satisfied');

process.chdir('../bible');
require('../bible/build');

process.chdir('../grammars2');
require('../grammars2/test');