// import express from 'express'expres;
// import  bodyParser from 'body-parser';
// import router from '../server/routes/users.js'
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const PORT = 3232;

app.use(bodyParser.json());


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const users = require("./routes/users");
app.use("/users", users);
app.post('/api/administratorLogin/:username/:password',(req,res)=>{
    console.log('---administratorLogin---')
    const username = req.params.username
    const password = req.params.password
    console.log(username,password)

})
app.post('/api/changeAgentParams/:agent/:latency/:variance',(req,res)=>{
    console.log('---changeAgentParams---')
    const agent = req.params.agent
    const latency = req.params.latency
    const variance = req.params.variance
    console.log(agent,latency,variance)

})
app.post('/api/registerPlayer/:mail/:age/:gender',(req,res)=>{
    console.log('---registerPlayer---')
    const mail = req.params.mail
    const age = req.params.age
    const gender = req.params.gender
    console.log(mail,age,gender)

})
app.post('/api/questionnaireAnswers',(req,res)=>{
    console.log('---questionnaireAnswers---')
    const qDict = req.body
    console.log(qDict)

})
app.post('/api/sendFeedBack/:feedBack',(req,res)=>{
    console.log('---sendFeedBack---')
    const feedBack = req.params.feedBack
    console.log(feedBack)

})
app.post('/api/sendGameData',(req,res)=>{
    console.log('---sendFeedBack---')
    const playerData = req.body
    // const agentData = req.params.agentData
    console.log(playerData)

})



app.listen(PORT);
console.log('Listening on port', PORT);


//************************************************************************************
// import express from 'express';
// import axios from 'axios';
// import bcryptjs from 'bcryptjs';
// import  bodyParser from 'body-parser';
//
//
// // require("dotenv").config();
// //#endregion
// //#region express configures
// // var path = require("path");
// import logger from "morgan";
//
// import cors from "cors";
//
// var app = express();
//
// // app.use(logger("dev")); //logger
// app.use(express.json()); // parse application/json
// app.use(bodyParser.json());
//
// app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// // app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
//
// // middleware to serve all the needed static files under the dist directory - loaded from the index.html file
// // https://expressjs.com/en/starter/static-files.html
// app.use(express.static("dist"));
//
// // app.get("/api", (req, res) => {
// //     res.sendFile(__dirname + "/index.html");
// // });
//
// const corsConfig = {
//     origin: true,
//     credentials: true,
// };
//
// app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));
//
// const port = process.env.PORT || "3232";
// const users = require("./routes/users");
//
// // Routings
// app.use("/users", users);
//
//
// // app.use(function (err, req, res, next) {
// //     console.error(err);
// //     res.status(err.status || 500).send(err.message);
// // });
//
// const server = app.listen(port, () => {
//     console.log(`Server listen on port ${port}`);
// });
//
// process.on("SIGINT", function () {
//   if (server) {
//     server.close(() => console.log("server closed"));
//   }
// });