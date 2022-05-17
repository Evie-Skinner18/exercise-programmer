import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let dbConnectionError = "";
const port = process.env.PORT || 8000;
console.log(`Port is ${port}`);

  if (!dbConnectionError) {
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
  } else {
    console.error("Shutting down Node server because DB connection was unsuccessful");
    process.exit();
  }

  async function connectMongoClient() {
    try {
      await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected successfully to db server");
    } catch(error) {
      dbConnectionError = error.message;
      console.error(dbConnectionError);
    }
  }
