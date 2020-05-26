const core = require('./core');
const log = require('./log');
const assert = require('./assert');
const file = require('./file');
const tools = require('./tools');
const commandLine = require('./commandLine');
const index = require('./index');

module.exports = {};
index.merge(module.exports, core);
index.merge(module.exports, log);
index.merge(module.exports, assert);
index.merge(module.exports, file);
index.merge(module.exports, tools);
index.merge(module.exports, commandLine);
index.merge(module.exports, index);