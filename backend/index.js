import app from "./server.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const mongoClient =  new mongodb.MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

const port = process.env.PORT || 8000;
console.log(`Port is ${port}`);

async function connectMongoClient() {
    try {
      // Connect the client to the server
    //   await mongoClient.connect();
      // Establish and verify connection
    //   await mongoClient.db("admin").command({ ping: 1 });

      console.log("Connected successfully to db server");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await mongoClient.close();
    }
  }

  connectMongoClient()
    .catch(err => { 
        console.error(err.message);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    });