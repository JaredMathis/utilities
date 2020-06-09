
const scope = require("./scope");
const assert = require("./assert");
const getUniqueFileName = require('./getUniqueFileName');
const getLibraryDirectoryName = require('./getLibraryDirectoryName');
const executeCommand = require('./executeCommand');
const arrayWhere = require('./arrayWhere');
const merge = require('./merge');
const getAwsApiGatewayFileName = require('./getAwsApiGatewayFileName');
const { readFile } = require('./file');
const fs = require('fs');

const role = 'arn:aws:iam::491701175555:role/service-role/sandbox-role-0p3p32vk'

module.exports = awsDeployLambda;

function awsDeployLambda(args) {
    let result;
    scope(awsDeployLambda.name, x => {
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
            console.log(`Lambda ${lambdaName} created.`);
        } else {
            console.log(`Lambda ${lambdaName} exists. Updating.`);
            output = executeCommand(`aws lambda update-function-code --function-name ${lambdaName} --zip-file fileb://${fileName}`);
            console.log(`Lambda ${lambdaName} updated.`);
        }

        console.log('Deleting ' + fileName);
        fs.unlinkSync(fileName);

        output = executeCommand(`aws lambda list-functions`);
        parsed = JSON.parse(output);
        lambdas = arrayWhere(parsed.Functions, { FunctionName: lambdaName });
        assert(() => lambdas.length === 1);
        let lambda = lambdas[0];

        try {
            executeCommand(`aws lambda add-permission --function-name ${lambdaName} --action lambda:InvokeFunction --statement-id apigateway --principal apigateway.amazonaws.com`);
        } catch (e) {
            e = e.innerError || e;
            let message = e.toString();
            merge(x, { message });
            merge(x, () => Object.keys(e));
            assert(() => message.indexOf('The statement id (apigateway) provided already exists.') >= 0);
        }

        output = executeCommand(`aws apigateway get-rest-apis`)
        parsed = JSON.parse(output);
        let apis = arrayWhere(parsed.items, { name: lambdaName });
        assert(() => apis.length <= 1);
        if (apis.length === 0) {
            console.log(`Api ${lambdaName} does not exist. Creating.`)
            output = executeCommand(`aws apigateway create-rest-api --name ${lambdaName}`)
            parsed = JSON.parse(output);
            console.log(`Api ${lambdaName} created.`)
        }

        output = executeCommand(`aws apigateway get-rest-apis`)
        parsed = JSON.parse(output);
        apis = arrayWhere(parsed.items, { name: lambdaName });
        assert(() => apis.length === 1);
        let apiId = apis[0].id;

        output = executeCommand(`aws apigateway get-resources --rest-api-id ${apiId}`)
        parsed = JSON.parse(output);
        assert(() => parsed.items.length === 1);
        let resourceId = parsed.items[0].id;

        try {
            executeCommand(`aws apigateway get-method --rest-api-id ${apiId} --resource-id ${resourceId} --http-method POST`)
        } catch (e) {
            console.log('Method POST does not exist. Creating.')
            executeCommand(`aws apigateway put-method --rest-api-id ${apiId} --resource-id ${resourceId} --http-method POST --authorization-type "NONE"`)
        }

        executeCommand(`aws apigateway put-integration --rest-api-id ${apiId} --resource-id ${resourceId} --http-method POST --type AWS --integration-http-method POST --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/${lambda.FunctionArn}/invocations --credentials ${role}`);

        try {
            executeCommand(`aws apigateway put-method-response --rest-api-id ${apiId} --resource-id ${resourceId} --http-method POST --status-code 200`);
        } catch (e) {
            e = e.innerError || e;
            let message = e.toString();
            merge(x, { message });
            merge(x, () => Object.keys(e));
            assert(() => message.indexOf('An error occurred (ConflictException) when calling the PutMethodResponse operation: Response already exists for this resource') >= 0);
        }

        executeCommand(`aws apigateway put-integration-response --rest-api-id ${apiId} --resource-id ${resourceId} --http-method POST --status-code 200 --selection-pattern ""`);

        const stage = "prod";
        executeCommand(`aws apigateway create-deployment --rest-api-id ${apiId} --stage-name ${stage}`);

        const file = './' + getAwsApiGatewayFileName();
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, "{}");
        }

        let json = readFile(file);
        parsed = JSON.parse(json);
        parsed[lambdaName] = {};
        if (!parsed[lambdaName][apiId]) {
            parsed[lambdaName]["default"] = apiId;
        }

        json = JSON.stringify(parsed, null, 2);
        fs.writeFileSync(file, json);

        console.log("");
        console.log(`${awsDeployLambda.name} Lambda and Gateway deploy ${lambdaName} success!`);
    });
    return result;
}
