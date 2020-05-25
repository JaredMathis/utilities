const core = require('./core');
const log = require('./log');
const assert = require('./assert');
const file = require('./file');
const tools = require('./tools');
const commandLine = require('./commandLine');
const publish = require('./publish');

module.exports = {};
log.merge(module.exports, core);
log.merge(module.exports, log);
log.merge(module.exports, assert);
log.merge(module.exports, file);
log.merge(module.exports, tools);
log.merge(module.exports, commandLine);
log.merge(module.exports, {publish});