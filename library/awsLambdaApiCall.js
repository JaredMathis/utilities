
const scope = require("./scope");
const assertIsString = require("./assertIsString");
const assert = require("./assert");
const merge = require("./merge");
const isDefined = require("./isDefined");
const request = require("sync-request");

module.exports = awsLambdaApiCall;

function awsLambdaApiCall(apigateway, lambdaName, jsonBody, context) {
    let result;
    scope(awsLambdaApiCall.name, x => {
        merge(x, { lambdaName });
        assertIsString(() => lambdaName);
        assert(() => isDefined(context));

        let apiId = apigateway[lambdaName]["default"];

        let response = request(
            'POST',
            `https://${apiId}.execute-api.us-east-1.amazonaws.com/prod`,
            {
                json: jsonBody || {},
            });
        let json = response.body.toString();
        merge(x, { json });
        let parsed = JSON.parse(json);
        merge(x, { parsed });
        try {
            parsed = JSON.parse(parsed);
        } catch (e) {
            console.log(__filename, { parsed });
            throw e;
        }
        merge(x, { parsed });

        assert(() => isDefined(parsed));
        result = parsed;

        merge(context, { parsed });
        if (parsed.error) {
            merge(context, () => parsed.error);
            merge(context, () => Object.keys(parsed.error));
            merge(context, () => parsed.error.stack);
            merge(context, () => parsed.error.string);
            if (parsed.error.stack || parsed.error.string) {
                console.log(__filename);
                if (parsed.error.stack)
                    console.log('parsed.error.stack', parsed.error.stack);
                if (parsed.error.string)
                    console.log('parsed.error.string', parsed.error.string);
            }
            if (parsed.error.e) {
                merge(context, () => parsed.error.e);
                if (parsed.error.e.context) {
                    merge(context, () => parsed.error.e.context);
                }
            }
        }
    });
    return result;
}
