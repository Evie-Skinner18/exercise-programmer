const express = require("express");
const actuator= require("express-actuator");

const app = express();
const port = 80;

app.use(express.json());

// health check for a load balancer
app.use(actuator());

app.listen(port, () => {
    console.log(`frontend health check server listening on port ${port}`)
;});
