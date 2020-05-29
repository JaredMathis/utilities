
const u = require("../../index");
const path = require('path');

const getUniqueFileName = require("../../library/getUniqueFileName.js");

u.scope(__filename, x => {
    let actual = getUniqueFileName(__filename);
    let expected = path.join(__dirname, 'getUniqueFileName2.js')
    u.merge(x, {actual});
    u.merge(x, {expected});
    u.assert(() => actual === expected);

    actual = getUniqueFileName(path.join(__dirname, 'a.js'));
    expected = path.join(__dirname, 'a3.js')
    u.merge(x, {actual});
    u.merge(x, {expected});
    u.assert(() => actual === expected);
});
