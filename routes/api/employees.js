const e = require('cors');
const express = require('express');
const router = express.Router();
const path = require('path');
const employeeController = require('../../controllers/employeesController');
const verifyJWT = require('../../middleware/verifyJWT');
// const id = data.employees[-1].id
// console.log(id + 1);

//Note you added an express  route point to this api route in the server.js file
router.route('/')
    .get(verifyJWT, employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee   );
// Note the api route above is same for post. get, put and delete method. The only thing that differentisates them is just the request method


router.route('/:id').get(employeeController.getEmployee);  

module.exports = router;