var Db = require('./tables_represantion/Users')
const dboperations = require('./dboperations')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {request, response} = require("express");
const app = express()
const router = express.Router();

app.use(bodyParser.urlencoded({express: true}));
app.use(bodyParser.json());
app.use(cors)
app.use('/api',router);


// router.use((request,response,next) => {
//     console.log('middleware');
//     next();
// })

router.route('/Users').get((request,response) =>{
    console.log("*****************")
    dboperations.getUsers().then(result => {
        console.log(result)
        response.json(result[0])
    })
})

const PORT = 4545;

app.listen(PORT);
console.log('Listening on port', PORT);

