
const scope = require("./scope");
const { execSync } = require('child_process');

module.exports = executeCommand;

function executeCommand(command) {
    let result;
    scope(executeCommand.name, x => {
        console.log('Executing command: ' + command);
        let output = execSync(command);
        result = output.toString();
    });
    return result;
}
