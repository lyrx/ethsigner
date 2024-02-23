const mongo = require('../scripts/mongoclient')


async function run() {
    let client
    try {
        // Connect the client to the server (optional starting in v4.7)
        client =  await mongo.getClient().connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
       client ?  await client.close() : console.log(`No client found.`)
    }
}
run().catch(console.dir);
