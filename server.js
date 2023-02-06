// const logEvent = require('./logEvent');
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('^/$|index(.html)?',(req, res)=>{
// res.send('Hello world!!!!!!!!!!!!'); for sending text to the html page

// res.sendFile('./views/index.html', {root: __dirname})  // nother way to server a file to the server in nodejs and express
res.sendFile(path.join(__dirname, 'views', 'index.html')); // Another way to server a file to the server in nodejs and express
});

app.get('/new-page',(req, res)=>{

    res.sendFile(path.join(__dirname, 'views', 'new-page.html')); 
 });

//Route handlers, can perform two functions all at once by using the next() fucntion (chain function),  Route Handlers

app.get('/hello(.html)?',(req, res, next)=>{
    console.log('Failed, operation moving to the next');
    next()
}, (req, res)=>{
res.send("Next funxtion at work herer")
});


//Route that Redirect from an old route to a new one, Route Handlers
app.get('/old-page(.html)?',(req, res)=>{
res.redirect('/new-page'); // Send a 302 by default, to send custom statuscode add it as a first parameter before your route
// console.log(res.statusCode);
 });

 // Route that renders a 404 page on route that does not exist,  Route Handlers
app.get('/*', (req, res) =>{
res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});//

app.listen(PORT, ()=> console.log(`server is runnung on port ${PORT}`))