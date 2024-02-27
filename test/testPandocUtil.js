const pandocutil = require('../scripts/pandocutil')


async function runTests() {
    const pathToXHTML = 'test/ch001.xhtml'

    const md = await  pandocutil.convertToMarkdown(pathToXHTML)
    console.log(md)
}

runTests()


// Example usage

