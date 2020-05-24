const u = require('../../all');
const fs = require('fs');
const path = require('path');

u.scope(__filename, context => {
    const from = path.join(__dirname, 'a');
    const to = path.join(__dirname, 'b');
    const files = ["1.txt","2.txt"];

    try {
        cleanup();

        // Create the directory
        fs.mkdirSync(from);
        // Add files to the directory
        u.loop(files, f => {
            let p = path.join(from, f);
            fs.writeFileSync(p, f);
        });
    
        // Copy the files in the directory
        u.copyFiles(from, to);
    
        // Ensure the destination has the original files
        const actual = fs.readdirSync(to);
        u.assertIsEqualJson(() => actual, files);

    } finally {
        cleanup();
    }

    function cleanup() {
        // Remove both directories
        u.loop([to, from], f => {
            if (fs.existsSync(f)) {
                u.deleteDirectory(f);
            }
        });
    }
});