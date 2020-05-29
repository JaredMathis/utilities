const {
    execSync,
} = require("child_process");

const u = require('./all');

// Run tests before bumping.
require('./test');

let bumped = u.bumpPackageVersion(__dirname);

execSync('npm publish');

console.log('published ' + bumped);