const u = require('./index');

u.executeCommand(`node u awsDeployLambda ${u.awsLambdaError.name}`);
u.executeCommand(`node u awsDeployLambda ${u.awsLambdaHelloWorld.name}`);