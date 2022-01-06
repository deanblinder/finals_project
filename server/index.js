import express from 'express';
import  bodyParser from 'body-parser';
const app = express();
const PORT = 3232;

/* TODO: 1. connect DB .
    TODO: 2. connect DB
    TODO: 3.
 */



app.use(bodyParser.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

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