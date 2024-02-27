const extractor = require('../scripts/extraction')
const seeder = require('../scripts/seeding')
const assert = require('assert');
const {addEbookToDatabase} = require("../scripts/seeding");

async function runTests() {
    const epubPath = 'test/greatexpectations.epub'

    const extractionPath = await extractor.extractEPUBToTempDirectory(epubPath)
    console.log(`Seeding ${extractionPath}`)
    const metaData = await seeder.extractEpubMetadata(extractionPath)


    const ebookData = await seeder.convertEpub(metaData, extractionPath)

    await seeder.addEbookToDatabase(ebookData)

}

runTests()




