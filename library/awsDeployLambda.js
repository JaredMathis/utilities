
const scope = require("./scope");
const assert = require("./assert");
const getUniqueFileName = require('./getUniqueFileName');
const getLibraryDirectoryName = require('./getLibraryDirectoryName');
const executeCommand = require('./executeCommand');
const arrayWhere = require('./arrayWhere');
const fs = require('fs');

const role = 'arn:aws:iam::491701175555:role/service-role/sandbox-role-0p3p32vk'

module.exports = deployAwsLambda;

function deployAwsLambda(args) {
    let result;
    scope(deployAwsLambda.name, x => {
        let output;
        let parsed;

        assert(() => args.length >= 1);
        let lambdaName = args[0];

        let fileName = getUniqueFileName('temp.zip');
        
        console.log('Zipping library and index.js to ' + fileName);
        output = executeCommand(`zip -r ${fileName} index.js ${getLibraryDirectoryName()}/`);

        output = executeCommand(`aws lambda list-functions`);
        parsed = JSON.parse(output);
        let lambdas = arrayWhere(parsed.Functions, { FunctionName: lambdaName });
        assert(() => lambdas.length <= 1);
        if (lambdas.length === 0) {
            console.log(`Lambda ${lambdaName} does not exist. Creating.`);
            output = executeCommand(`aws lambda create-function --function-name ${lambdaName} --runtime nodejs12.x --role ${role} --handler index.${lambdaName} --zip-file fileb://${fileName}`);
            console.log(output);
        } else {
            output = executeCommand(`aws lambda update-function-code --function-name ${lambdaName} --zip-file fileb://${fileName}`);
            console.log(output);
        }

        fs.unlinkSync(fileName);
    });
    return result;
}
