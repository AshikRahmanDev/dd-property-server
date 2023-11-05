const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashikrahmandev:mongodb2002@admin.fcnh0s3.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//  async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run()
// database
const database = "ddproperty"

// collection
const userCollection = client.db(database).collection("users")
const propertyCollection = client.db(database).collection("property")

module.exports={
    userCollection,
    propertyCollection
}