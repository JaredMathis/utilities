const {
    execSync,
} = require("child_process");

// Run tests before bumping.
require('./test');

const u = require('./all');

let bumped = u.bumpPackageVersion(__dirname);

execSync('npm publish');

console.log('published ' + bumped);