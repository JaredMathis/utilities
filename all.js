const merge = require("./library/merge.js");
const core = require('./core');
const log = require('./log');
const assert = require('./assert');
const file = require('./file');
const tools = require('./tools');
const commandLine = require('./commandLine');

module.exports = {};
merge(module.exports, core);
merge(module.exports, log);
merge(module.exports, assert);
merge(module.exports, file);
merge(module.exports, tools);
merge(module.exports, commandLine);