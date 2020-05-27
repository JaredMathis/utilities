
const u = require("../../all");

const arrayContainsDuplicates = require("../../library/arrayContainsDuplicates.js");

u.scope(__filename, x => {
    u.assert(() => arrayContainsDuplicates([1,2,3]) === false);
    u.assert(() => arrayContainsDuplicates([1,'1',2,3]) === false);
    u.assert(() => arrayContainsDuplicates([1,2,1,3]) === true);
    u.assert(() => arrayContainsDuplicates([1,2,2,3]) === true);
    u.assert(() => arrayContainsDuplicates([1,2,3,3]) === true);
    u.assert(() => arrayContainsDuplicates(['a','a']) === true);
});
