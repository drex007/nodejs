const express = require('express');
const router = express.Router();
const path = require('path');
const data = {}
data.employees = require('../../data/employees.json');
// const id = data.employees[-1].id
// console.log(id + 1);

//Note you added an express  route point to this api route in the server.js file
router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });

    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id });
    });
// Note the api route above is same for post. get, put and delete method. The only thing that differentisates them is just the request method


router.route('/:id').get((req, res) => {
    res.json({ "id": req.params.id }); // the param id is what is the parameter requirement in our route
})

module.exports = router;