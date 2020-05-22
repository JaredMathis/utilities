const core = require('./core');
const log = require('./log');
const assert = require('./assert');
const file = require('./file');
const tools = require('./tools');

module.exports = {};
log.merge(module.exports, core);
log.merge(module.exports, log);
log.merge(module.exports, assert);
log.merge(module.exports, file);
log.merge(module.exports, tools);