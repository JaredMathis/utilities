const {
    execSync,
} = require("child_process");

// Run tests before bumping.
require('./test');

const u = require('./all');

u.bumpPackageVersion();

execSync('npm publish');