const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const PORT = 3232;
// app.use(bodyParser({limit: '50mb'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const users = require("./routes/users");
app.use("/users", users);

// const sessionsNetworkAlgo = require("./routes/sessionsNetworkAlgo");
// app.use("/sessionsNetworkAlgo", sessionsNetworkAlgo);
//
// const sessionAgentLeader = require("./routes/sessionAgentLeader");
// app.use("/sessionAgentLeader", sessionAgentLeader);
//
// const sessionsAgentFollowerAlgo = require("./routes/sessionsAgentFollowerAlgo");
// app.use("/sessionsAgentFollowerAlgo", sessionsAgentFollowerAlgo);

const actions = require("./routes/actions");
app.use("/actions", actions);

const dictAns = require("./routes/dictAns");
app.use("/dictAns", dictAns);

const userAnswers = require("./routes/userAnswers");
app.use("/userAnswers", userAnswers);

const admin = require("./routes/admin");
app.use("/admin", admin);

const agents = require("./routes/agents");
app.use("/agents", agents);

const params = require("./routes/params");
app.use("/params", params);

const errors = require("./routes/errors");
app.use("/errors", errors);

const feedback = require("./routes/feedback");
app.use("/feedback", feedback);



/*
TODO: delete all until app.listen(PORT);
 */
// app.get('/api/administratorLogin/:username/:password',(req,res)=>{
//     console.log('---administratorLogin---')
//     const username = req.params.username
//     const password = req.params.password
//     console.log(username,password)
//
// })
// app.post('/api/changeAgentParams/:agent/:latency/:variance',(req,res)=>{
//     console.log('---changeAgentParams---')
//     const agent = req.params.agent
//     const latency = req.params.latency
//     const variance = req.params.variance
//     console.log(agent,latency,variance)
//
// })
// app.post('/api/registerPlayer/:mail/:age/:gender',(req,res)=>{
//     console.log('---registerPlayer---')
//     const mail = req.params.mail
//     const age = req.params.age
//     const gender = req.params.gender
//     console.log(mail,age,gender)
//
// })
// app.post('/api/questionnaireAnswers',(req,res)=>{
//     console.log('---questionnaireAnswers---')
//     const qDict = req.body
//     console.log(qDict)
//
// })
// app.post('/api/sendFeedBack/:feedBack',(req,res)=>{
//     console.log('---sendFeedBack---')
//     const feedBack = req.params.feedBack
//     console.log(feedBack)
//
// })
// app.post('/api/sendGameData',(req,res)=>{
//     console.log('---sendFeedBack---')
//     const playerData = req.body
//     // const agentData = req.params.agentData
//     console.log(playerData)
//
// })



app.listen(PORT);
console.log('Listening on port', PORT);

