const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const port = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
    saveUninitialized: true,
    secret: 'mysessionSecret',
    resave: false,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 360000
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./market/dist")));
app.use(session(sessionConfig));
app.use(cookieParser('aldknvalinrlekajleifnvaalekfn'));

require('./server/config/mongoose.js');

app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/bikes', require('./server/config/routes/routes.js'));
app.use('/api/auth', require('./server/config/routes/auth.js'));
app.use(require('./server/config/routes/catch-all.js'));
// const routes_setter = require('./server/config/routes.js');
// // invoke the function stored in routes_setter and pass it the "app" variable
// routes_setter(app);


const server = app.listen(port, () => console.log(`Listening on port ${ port }`));