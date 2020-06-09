
const u = require("../../index");

const executeCommand = require("../../library/executeCommand.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let output = executeCommand(`cat ${__filename}`);
    u.assert(() => output.indexOf(executeCommand.name) > 0)
});
