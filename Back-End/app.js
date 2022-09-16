const express = require("express");
const app = express();
const router = require("./src/router/api");
//const path = require('path')

//require Security middleware
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

//Implement of Security middleware
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xssClean());
//rate limit security middleware
const apiLimit = rateLimit({
  windowMs: 15 * 60 * 1000, //Per 15 minute
  max: 100, //100 request from one windows/ip adderss
});

app.use(apiLimit);

app.use(express.json());

//Connecting with Client-side
// app.use(express.static(path.join(__dirname, 'client-side/build')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//connecting with API
app.use("/api/v1", router);

//Undefine Route
app.use("*", (req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = app;
