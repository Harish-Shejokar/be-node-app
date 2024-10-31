const express = require("express");
const setupRoutes = require("./routes");
require("dotenv").config();
const db = require(`./db/database`);
const bodyParser = require(`body-parser`);


const app = express();
app.use(bodyParser.json());
//-------routes funciton call------------
setupRoutes(app)

//monogoDb-connection
db.mongoDbConnection();


const portNumber = process.env.PORT;

app.listen(portNumber, () => {
    console.log(`Server listening on port ${portNumber}`);
})


// -----------------listioning-server by http module ----------------
// const http = require("http");
// http.createServer().listen(4000, console.log("server listing on port - 4000"))