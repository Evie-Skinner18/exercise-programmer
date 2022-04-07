import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MongoClient = mongodb.MongoClient();
const port = process.env.PORT || 8000;
MongoClient.connect(
    process.env.MONGO_DB_CONNECTION_STRING,
     {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParse: true
    }
)
.catch(err => { 
    console.error(err.message);
    process.exit(1);
})
.then(async client => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
});