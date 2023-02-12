// const logEvent = require('./logEvent');
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
//Adding cors
const cors = require('cors');
const { logEvent, logger } = require('./middleware/logEvent');

const PORT = process.env.PORT || 3500;

//Custom middleware logger

app.use(logger); // We modularize our logger by moving the function below into the LogEvent.js file and calling the function logger

const whitelist = ["https://www.google.com", "http://localhost:3500"];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by Cors'));
        }
    },
    optionsSuccessStatus: 200
}



//Cross origin resource sharing 
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     logEvents(`${req.method}\t ${req.headers.origin}\t${req.url}`, 'reqLog.txt');
//     console.log(`${req.method} ${req.path}`);
//     next(); // Why we are adding the next function is to ensure that the next request is called, without the next function the program automiatically stops here
//     //For the built in custom middlew ares, You dont need a next function cause the next is areay built in the middlewre
// })

//Built in middleware to handle u rlencoded data(i,e this middle ware is basically built for request coming into as form data)
app.use(express.urlencoded({ extended: false }));

//Since we are using an express router to route our pages, we need to declare the routes directory here
app.use('/subdir', require('./routes/subdir'));
// This built in  middle ware is built for request coming in with data in form of json
app.use(express.json());

//This middleware helps to serve static files
app.use(express.static(path.join(__dirname, '/public')));
// You can also serve staic file in the subdir folder
app.use('/subdir',express.static(path.join(__dirname, '/public'))); 





app.get('^/$|index(.html)?', (req, res) => {
    // res.send('Hello world!!!!!!!!!!!!'); for sending text to the html page

    // res.sendFile('./views/index.html', {root: __dirname})  // nother way to server a file to the server in nodejs and express
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Another way to server a file to the server in nodejs and express
});

app.get('/new-page', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

//Route handlers, can perform two functions all at once by using the next() fucntion (chain function),  Route Handlers

app.get('/hello(.html)?', (req, res, next) => {
    console.log('Failed, operation moving to the next');
    next()
}, (req, res) => {
    res.send("Next funxtion at work herer")
});


//Route that Redirect from an old route to a new one, Route Handlers
app.get('/old-page(.html)?', (req, res) => {
    res.redirect('/new-page'); // Send a 302 by default, to send custom statuscode add it as a first parameter before your route
    // console.log(res.statusCode);
});

// Route that renders a 404 page on route that does not exist,  Route Handlers
//You can use app.all('*') here for this 404 html rendering    
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});//

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is runnung on port ${PORT}`)) 