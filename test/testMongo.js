const mongo = require('../scripts/mongoclient')
const assert = require('assert');
const config = require('../scripts/config')
async function run() {

    const client = await mongo.getClient().connect();
    async function pingTest() {
        return  await client.db("admin").command({ping: 1}) ? true : false;
    }

    async function bookPageTest() {
        const db = client.db(config.dbName)
        const collection = db.collection(config.collectionName)
        return true
    }



    try {
        assert(await pingTest())
        assert(await bookPageTest())

    } finally {
        // Ensures that the client will close when you finish/error
        client ? await client.close() : console.log(`No client found.`)
    }
}

run().catch(console.dir);
