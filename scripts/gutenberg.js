const fs = require('fs').promises;
const path = require('path');
const {getClient} = require('./mongoclient'); // Adjust the path as necessary


// Database and Collection Names
const dbName = 'DocumentLibrary';
const collectionName = 'Gutenberg';


module.exports = {
    addEbookToDatabase: async function (ebookData) {
        const client = await getClient().connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        client.close();
    },


    extractEpubMetadata: async function (extractionPath) {


   }



