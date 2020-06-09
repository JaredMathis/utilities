
const scope = require("./scope");

module.exports = getLibraryDirectoryName;

function getLibraryDirectoryName() {
    let result;
    scope(getLibraryDirectoryName.name, x => {
        result = 'library'
    });
    return result;
}
