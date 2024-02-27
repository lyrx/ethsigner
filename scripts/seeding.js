const fs = require('fs').promises;
const path = require('path');
const {getClient} = require('./mongoclient'); // Adjust the path as necessary
const xml2js = require('xml2js');
const pandocutil = require('./pandocutil')

// Database and Collection Names
const dbName = 'DocumentLibrary';
const collectionName = 'Ebooks';


module.exports = {
    addEbookToDatabase: async function (ebookData) {
        const client = await getClient().connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        // await client.db("admin").command({ ping: 1 });
        await collection.insertOne(ebookData)

        client.close();
    },


    extractEpubMetadata: async function (extractionPath) {
        const opfFileContent = await fs.readFile(`${extractionPath}/EPUB/content.opf`, 'utf-8');
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(opfFileContent);

        // Assuming the OPF follows the standard EPUB structure
        const metadata = result.package.metadata[0];
        const uniqueId = metadata['dc:identifier'][0]['_']
        const aAuthor = metadata['dc:creator'][0]['_']
        const aTitle = metadata['dc:title'][0]['_']

        return {
            id: uniqueId,
            author: aAuthor,
            title: aTitle,
            epub: {},
            markdown: {}
        };
    },

    convertEpub: async function (epubData, dir, relativePath = '') {
        const entries = await fs.readdir(dir, {withFileTypes: true})

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            const entryPath = path.join(relativePath, entry.name)

            if (entry.isDirectory()) {
                // If entry is a directory, recursively read its content
                await this.convertEpub(epubData, fullPath, entryPath)
            } else {
                // If entry is a file, read its content and store in the struct
                const xhtmlContent = await fs.readFile(fullPath, 'utf8')
                const md = await pandocutil.convertToMarkdown(fullPath)
                epubData.epub[`${entryPath}`] = xhtmlContent
                if (entryPath.startsWith('EPUB/text') && entryPath.endsWith('.xhtml')) {
                    const mdPath = entryPath.replace(/\.xhtml$/, '.md')
                    epubData.markdown[`${mdPath}`] = md
                }

            }
        }
        return epubData
    }
}



