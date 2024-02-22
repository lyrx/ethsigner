const extractor = require('../scripts/extraction')
const assert = require('assert');

async function runTests() {
     const epubPath = 'masteringethereum.epub'

     const p  = await extractor.extractEPUBToTempDirectory(epubPath)

     console.log(`Extracted to ${p}`)

}

runTests()






