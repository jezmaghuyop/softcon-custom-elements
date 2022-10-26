const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

    const files = [    
        './dist/custom-components/runtime.js',
        './dist/custom-components/polyfills.js',
        './dist/custom-components/main.js',
    ];

    // Make sure directory exist, if not it will create it
    await fs.ensureDir('elements');

    // Delete all files inside the directory if it already existed before
    // we want to make sure, we only copy new files
    await fs.emptyDirSync('elements');

    const exludeFiles = [
        'main.js',
        'polyfills.js',
        'runtime.js',

        // We don't need this
        'index.html',
        'favicon.ico',
        '3rdpartylicenses.txt',
        'assets' // entire assets folder (depends on situation)
    ];

    // Copy all files in dist folder except the `excluded files`
    // we will merge them into a single file
    fs.copy('./dist/custom-components', './elements', {
        clobber: true,
        filter: n => {
            console.log(n);
            const shouldExclude = exludeFiles.find(x => n.indexOf(x) >= 0);

            return !shouldExclude;
        }
    },
        () => console.log('done')
    );

    await concat(files, 'elements/softcon-table.js');
})();