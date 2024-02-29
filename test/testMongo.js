const mongo = require('../scripts/mongoclient')
const assert = require('assert');

async function run() {


    const client = await mongo.getClient().connect();
    async function pingTest() {
        return  await client.db("admin").command({ping: 1}) ? true : false;

    }

    try {
        assert(await pingTest()  )

    } finally {
        // Ensures that the client will close when you finish/error
        client ? await client.close() : console.log(`No client found.`)
    }
}

run().catch(console.dir);
