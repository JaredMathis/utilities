const {
    execSync,
} = require("child_process");

// Run tests before bumping.
require('./test');

const u = require('./all');

u.bumpPackageVersion(__dirname);

execSync('npm publish');