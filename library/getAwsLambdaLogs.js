
const scope = require("./scope");
const assertIsArray = require("./assertIsArray");
const assert = require("./assert");
const executeCommand = require("./executeCommand");
const getUniqueFileName = require('./getUniqueFileName');
const fs = require('fs');

module.exports = getAwsLambdaLogs;

function getAwsLambdaLogs(args, messages) {
    let result;
    scope(getAwsLambdaLogs.name, x => {
        assertIsArray(() => messages);
        assert(() => args.length === 1);

        let lambdaName = args[0];
        let logGroupName = `/aws/lambda/${lambdaName}`;

        let json = executeCommand(`aws logs describe-log-streams --log-group-name ${logGroupName}`);
        let parsed = JSON.parse(json);

        // Get the most recently created log stream.
        parsed.logStreams.sort((a,b) => b.creationTime - a.creationTime);
        let logStream = parsed.logStreams[0];

        let logStreamName = logStream.logStreamName;

        let fileName = getUniqueFileName('temp.json');
        fs.writeFileSync(fileName, JSON.stringify({logGroupName,logStreamName}));
        json = executeCommand(`aws logs get-log-events --cli-input-json file://${fileName}`)
        fs.unlinkSync(fileName);

        parsed = JSON.parse(json);
        parsed.events;

        console.log(parsed.events);
    });
    return result;
}
