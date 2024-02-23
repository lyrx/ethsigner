require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");



module.exports = {

    getClient:  function(){
      return  new MongoClient(process.env.MONGO_URI,  {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            }
        );
    }

}

