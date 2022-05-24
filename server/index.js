var https = require('https');
var fs = require('fs');
var cors = require("cors");
var cookieSession = require('cookie-session')

const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());

const PORT = 443;

var httpsOptions = {
    //key: fs.readFileSync(path.join(__dirname, "server.key")),
    //cert: fs.readFileSync(path.join(__dirname, "server.cert")),
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('fullchain.pem')
}

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours

}));

const corsConfig = {
    origin: true,
    credential: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(cors());

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


var server = https.createServer(httpsOptions, app);
server.listen(PORT);
server.on('listening', onListening);

//app.listen(PORT);
//console.log('Listening on port', PORT);
/**
 * Event listener for HTTP server "listening" event.
 */
server.address("https://syncProject.cs.bgu.ac.il");
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`Server listen in port ${PORT} in adrress ${addr.address}`);
}
