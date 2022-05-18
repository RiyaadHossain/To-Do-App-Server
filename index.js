const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

// Middlewares
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster.rn7n6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    const taskCollection = client.db("AllTasks").collection("Task");

    // GET API
    app.get("/tasks", async(req, res)=>{
      const result = await taskCollection.find().toArray()
      res.send(result)
    })

    // PUT API
    app.put("/task", async(req, res) =>{
      const done = req.body
    })

    // POST API
    app.post("/addtask", async(req, res) =>{
      const task = req.body
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })

    // DELETE API
    app.delete("/task/:id", async(req, res) =>{
      const id = req.params.id
      const filter = {_id: ObjectId(id)}
      const result = await taskCollection.deleteOne(filter)
      res.send(result)
    })

    // PUT API
    app.put("/task/:id", async(req, res) => {
      const id = req.params.id
      const done = req.body
      const filter = {_id: ObjectId(id)}
      console.log(done);
      const updatedDoc = {
        $set: {
          done
        }
      }
      const result = await taskCollection.updateOne(filter, updatedDoc)
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