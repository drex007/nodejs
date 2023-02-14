// const logEvent = require('./logEvent');
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
//Adding cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logEvent, logger } = require('./middleware/logEvent');

const PORT = process.env.PORT || 3500;

//Custom middleware logger

app.use(logger); // We modularize our logger by moving the function below into the LogEvent.js file and calling the function logger
 
//Cross origin resource sharing 
app.use(cors(corsOptions));

//Built in middleware to handle u rlencoded data(i,e this middle ware is basically built for request coming into as form data)
app.use(express.urlencoded({ extended: false }));

//Added an api route for employees
app.use('/employees', require('./routes/api/employees'));
// This built in  middle ware is built for request coming in with data in form of json
app.use(express.json());

//This middleware helps to serve static files
app.use(express.static(path.join(__dirname, '/public')));

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