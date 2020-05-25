const u = require("../../all");
const assertIsJsonResponse = require("../../library/assertIsJsonResponse.js");

u.scope(__filename, x => {
    let response;
    
    response = {status: 200, data:{success:true}};

    assertIsJsonResponse(response, 200, {success:true})
    
    let valid = u.throws(() => assertIsJsonResponse(response, 200, {success:true}));
    u.merge(x, {valid});
    u.assert(() => !valid);
    u.assert(() => u.throws(() => assertIsJsonResponse(response, 201, {success:false})));
    u.assert(() => u.throws(() => assertIsJsonResponse(response, 200, {success:false})));
});
