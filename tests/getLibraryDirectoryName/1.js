
const u = require("../../index");

const getLibraryDirectoryName = require("../../library/getLibraryDirectoryName.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    u.assert(() => getLibraryDirectoryName() === 'library');
});
