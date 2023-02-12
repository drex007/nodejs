const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|index(.html)?', (req, res) => {
    // res.send('Hello world!!!!!!!!!!!!'); for sending text to the html page

    // res.sendFile('./views/index.html', {root: __dirname})  // nother way to server a file to the server in nodejs and express
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html')); // Another way to server a file to the server in nodejs and express
});

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'subdir','test.html')); // Another way to server a file to the server in nodejs and express
});

module.exports = router;