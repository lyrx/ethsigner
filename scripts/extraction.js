const fs = require('fs-extra');
const JSZip = require('jszip');
const os = require('os');
const path = require('path');


module.exports = {


    extractEPUBToTempDirectory:   async function (epubFilePath) {
        const data = await fs.readFile(epubFilePath);
        const zip = await JSZip.loadAsync(data);
        const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'epub-'));

        await Promise.all(
            Object.keys(zip.files).map(async (fileName) => {
                const fileData = await zip.file(fileName).async("nodebuffer");
                const filePath = path.join(tempDir, fileName);
                await fs.ensureDir(path.dirname(filePath));
                await fs.writeFile(filePath, fileData);
            })
        );
        return tempDir;
    }

}

