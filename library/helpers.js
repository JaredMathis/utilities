
const scope = require("./scope");
const merge = require("./merge");
const { EOL } = require('os');

scope(__filename, x => {
    module.exports = {};
    
    merge(module.exports, {EOL});
});
