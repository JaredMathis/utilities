require('./tests/isArrayIndex');

process.chdir('../bible');
require('../bible/build');

process.chdir('../grammars2');
require('../grammars2/test');