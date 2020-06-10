const executeCommand = require("./library/executeCommand");

const u = require('./index');

// Run tests before bumping.
require('./test');

let bumped = u.bumpPackageVersion(__dirname);

executeCommand('npm publish');

console.log('published ' + bumped);