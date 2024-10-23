const express = require("express");
const setupRoutes = require("./routes");
require("dotenv").config();

const app = express();

//-------routes funciton call------------
setupRoutes(app)


const portNumber = process.env.PORT;

app.listen(portNumber, () => {
    console.log(`Server listening on port ${portNumber}`);
})


// -----------------listing-server my http module ----------------
// const http = require("http");
// http.createServer().listen(4000, console.log("server listing on port - 4000"))