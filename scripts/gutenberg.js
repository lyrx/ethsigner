const fs = require('fs');
const path = require('path');
const {getClient} = require('./mongoclient'); // Adjust the path as necessary
const csvParser = require('csv-parser');
const config = require('./config')
const mongo = require("./mongoclient"); // Adjust the path as necessary

// Database and Collection Names

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

module.exports = {


    addShelveIfNeeded: async function (aShelve, client) {
        const shelveObject = {name: aShelve}
        const filter = {name: aShelve};
        const update = {
            $setOnInsert: shelveObject
        };
        const options = {upsert: true}

        const database =  client.db(config.dbName);
        const collection = database.collection(config.gutenBergShelves);
        await collection.updateOne(filter, update, options)
        return collection.findOne(filter)
    },

    addAllShelvesIfNeeded: async function (entry, client) {
        const aShelveList = this.shelves(entry)
        const res = []
        for(const aIndex in aShelveList){
            const aShelve = aShelveList[aIndex]
            await res.push(await this.addShelveIfNeeded(aShelve, client))
        }
        return  uniq(res.map((r) => r._id.toString()))
    },


    shelves: function (entry) {
        return uniq((entry.Bookshelves.split(';').
        map(a => a.trim())).filter(ss => ss?.length > 0))
    },


    addAllSubjectsIfNeeded: async function (entry, client) {
        const subjects = this.subjects(entry)
        const res = []
        for(const aIndex in subjects){
            const aSubject = subjects[aIndex]
            await res.push(await this.addSubjectIfNeeded(aSubject, client))
        }
        return  uniq(res.map((r) => r._id.toString()))
    },
    addSubjectIfNeeded: async function (aSubject, client) {
        const filter = {name: aSubject.name};
        const update = {
            $setOnInsert: aSubject
        };
        const options = {upsert: true}

        const database =  client.db(config.dbName);
        const collection = database.collection(config.gutenBergSubjectsName);
        await collection.updateOne(filter, update, options)

        return collection.findOne(filter)
    },


    subjects: function (entry) {
        return (entry.Subjects.split('--').
        map(a => a.trim())).map((b) => {
            return {name: b}
        })
    },


    addAllAuthorsIfNeeded: async function (entry, client) {
        const authorStrings = this.authorStrings(entry)
        const res = []

        const aParseAuthorString = this.parseAuthorString
        const aAddAuthorIfNeeded = this.addAuthorIfNeeded

        for(const aIndex in authorStrings){
            const authorString = authorStrings[aIndex]
            const author = aParseAuthorString(authorString)
            await res.push(await aAddAuthorIfNeeded(author, client))
        }
        return  uniq(res.map((r) => r._id.toString()))
    },

    authorStrings: function (entry) {
        return entry.Authors.split(';').map(a => a.trim())
    },
    addAuthorIfNeeded: async function (a, client) {
        const filter = {name: a.name, firstNames: a.firstNames, born: a.born, died: a.died};
        const update = {
            $setOnInsert: a
        };
        const options = {upsert: true}

        const database =  client.db(config.dbName);
        const collection = database.collection(config.gutenBergAuthorsCollectionName);
        await collection.updateOne(filter, update, options)

        return collection.findOne(filter)
    },

    parseAuthorString: function (authorStr) {
        const parts = authorStr.split(',').map(s => s.trim())

        const lastName = parts[0]

        const firstNames = parts[1].replace( /\[(.*?)\]/g,'').trim()
        const rest = parts[2]

        const [aPart, rolePart] = authorStr.split('[').map(part => part?.trim());
        const role = rolePart?.slice(0, -1);


        let born
        let died

        const regex = /(\d{4})-(\d{4})?/;
        const match = rest?.match(regex);
        if (match) {
            born = parseInt(match[1], 10)
            died = match[2] ? parseInt(match[2], 10) : died
        }


        // Return the structured object
        return {
            name: lastName,
            firstNames: firstNames,
            role: role,
            born: born,
            died: died
        };
    },


    /*

    {
    name: 'Choate',
    firstNames: 'Joseph Hodges',
    role: 'Contributor'
    born: '1832',
    died: '1917'
    }


     */
    getOrCreateAuthorReference:

        async function (name, client) {
            const db = client.db(config.dbName)
            const authorsCollection = db.collection(config.gutenBergAuthorsCollectionName)
            let author = await authorsCollection.findOne({name});

            /*
            let author = await db.collection('authors').findOne({ name });
            if (!author) {
                const result = await db.collection('authors').insertOne({ name });
                author = result.ops[0];
            }
            return author._id;

             */

        }

    ,


    parseCSV: async function (csvFilePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(csvFilePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
        return results
    }
    ,

    addEbookToDatabase: async function (ebookData) {
        const client = await getClient().connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        client.close();
    }
    ,


    extractEpubMetadata: async function (extractionPath) {


    }
}



