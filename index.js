const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

// Middlewares
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://mongodb1:wy2nMgYmcRbCyGgb@mycluster.rn7n6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    const taskCollection = client.db("sample_mflix").collection("movies");

    // GET API
    app.get("/task", async(req, res)=>{
      const result = await taskCollection.find().toArray()
      res.send(result)
    })

    // POST API
    app.post('/addtask', async(req, res) =>{
      const task = req.body
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })
  }
  finally{
    // Nothing Here
  }
} 

run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})