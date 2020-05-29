
const scope = require("./scope");
const assert = require("./assert");
const isString = require("./isString");
const fs = require("fs");
const path = require("path");

module.exports = getUniqueFileName;

function getUniqueFileName(filePath) {
    let result;
    scope(getUniqueFileName.name, x => {
        if (!fs.existsSync(filePath)) {
            result = filePath;
            return;
        }
        let directory = path.dirname(filePath);
        let fileName = path.parse(filePath).name;
        let extension = path.extname(filePath);

        assert(() => isString(directory));
        assert(() => isString(fileName));
        assert(() => isString(extension));

        let i = 1;
        do {
            i++;
            result = path.join(directory, `${fileName}${i}${extension}`);
        } while (fs.existsSync(result));
    });
    return result;
}
