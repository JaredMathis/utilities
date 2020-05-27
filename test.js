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
require("./tests/assert/assert.js");
require("./tests/throws/throws.js");
require("./tests/assertIsEqualJson/assertIsEqualJson.js");
require("./tests/assertIsJsonResponse/assertIsJsonResponse.js");
require("./tests/propertiesToString/propertiesToString.js");
require("./tests/scope/scope");
require("./tests/toQueryString/toQueryString.js");
require("./tests/propertiesAreEqual/propertiesAreEqual.js");
require("./tests/assertIsStringArray/assertIsStringArray.js");
require("./tests/assertOnlyContainsProperties/assertOnlyContainsProperties.js");
require("./tests/merge/merge.js");
require("./tests/arrayExcept/arrayExcept.js");
require("./tests/isArray/isArray.js");
require("./tests/assertThrows/assertThrows.js");
require("./tests/arrayContainsDuplicates/arrayContainsDuplicates.js");
require("./tests/range/range.js");
require("./tests/isInteger/isInteger.js");
require("./tests/isString/isString.js");
require("./tests/isSetEqual/isSetEqual.js");