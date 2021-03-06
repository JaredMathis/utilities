
const core = require('./library/core');
const log = require('./library/log');
const file = require('./library/file');
const tools = require('./library/tools');
const commandLine = require('./library/commandLine');

module.exports = {};
module.exports.merge = require("./library/merge.js");

module.exports.merge(module.exports, core);
module.exports.merge(module.exports, log);
module.exports.merge(module.exports, file);
module.exports.merge(module.exports, tools);
module.exports.merge(module.exports, commandLine);

module.exports.throws = require("./library/throws.js");
module.exports.assertIsJsonResponse = require("./library/assertIsJsonResponse.js");
module.exports.assertIsEqualJson = require("./library/assertIsEqualJson.js");
module.exports.assert = require("./library/assert.js");
module.exports.scope = require("./library/scope.js");
module.exports.propertiesToString = require("./library/propertiesToString.js");
module.exports.toQueryString = require("./library/toQueryString.js");
module.exports.propertiesAreEqualAndOnlyContainsProperties = require("./library/propertiesAreEqualAndOnlyContainsProperties.js");
module.exports.assertIsStringArray = require("./library/assertIsStringArray.js");
module.exports.assertOnlyContainsProperties = require("./library/assertOnlyContainsProperties.js");
module.exports.arrayExcept = require("./library/arrayExcept.js");
module.exports.isArray = require("./library/isArray.js");
module.exports.assertThrows = require("./library/assertThrows.js");
module.exports.arrayContainsDuplicates = require("./library/arrayContainsDuplicates.js");
module.exports.range = require("./library/range.js");
module.exports.isInteger = require("./library/isInteger.js");
module.exports.isString = require("./library/isString.js");
module.exports.isFunction = require("./library/isFunction.js");
module.exports.isSetEqual = require("./library/isSetEqual.js");
module.exports.config = require("./library/config.js");
module.exports.arraySingle = require("./library/arraySingle.js");
module.exports.propertiesAreEqual = require("./library/propertiesAreEqual.js");
module.exports.loop = require("./library/loop.js");
module.exports.stringTrimLambdaPrefix = require("./library/stringTrimLambdaPrefix.js");
module.exports.isDefined = require("./library/isDefined.js");
module.exports.isUndefined = require("./library/isUndefined.js");
module.exports.getUniqueFileName = require("./library/getUniqueFileName.js");
module.exports.EOL = require("./library/helpers.js").EOL;
module.exports.splitByEOL = require("./library/splitByEOL.js");
module.exports.assertIsString = require("./library/assertIsString.js");
module.exports.unwrapIfLambda = require("./library/unwrapIfLambda.js");
module.exports.assertIsStringArrayNested = require("./library/assertIsStringArrayNested.js");
module.exports.arraySequenceEquals = require("./library/arraySequenceEquals.js");
module.exports.assertIsArray = require("./library/assertIsArray.js");
module.exports.getAwsLambdaLogs = require("./library/getAwsLambdaLogs.js");
module.exports.executeCommand = require("./library/executeCommand.js");
module.exports.awsDeployLambda = require("./library/awsDeployLambda.js");
module.exports.getLibraryDirectoryName = require("./library/getLibraryDirectoryName.js");
module.exports.processExit = require("./library/processExit.js");
module.exports.truncateStringTo = require("./library/truncateStringTo.js");
module.exports.awsLambdaHelloWorld = require("./library/awsLambdaHelloWorld.js");
module.exports.arrayWhere = require("./library/arrayWhere.js");
module.exports.assertIsEqual = require("./library/assertIsEqual.js");
module.exports.getAwsApiGatewayFileName = require("./library/getAwsApiGatewayFileName.js");
module.exports.awsLambdaError = require("./library/awsLambdaError.js");
module.exports.awsScope = require("./library/awsScope.js");
module.exports.awsLambdaApiCall = require("./library/awsLambdaApiCall.js");
module.exports.isGuid = require("./library/isGuid.js");
module.exports.padNumber = require("./library/padNumber.js");
module.exports.args = require("./library/args.js");