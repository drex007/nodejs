const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}



const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ "message": "Firstname and lastname are required" })
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `The employee with this ID ${req.body.id} does not exist` })
    }

    if (req.body.firstname) employee.firstname = req.body.firstname
    if (req.body.lastname) employee.firstname = req.body.lastname

    const filterArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filterArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees)
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    if (!employee) {
        res.status(400).json({ "message": "This user does not exist" })
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray])
    res.json(data.employees);


}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) {
        res.status(400).json({ "message": "This user does not exist" })
    }

    res.json(employee)

}

module.exports = {
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    createNewEmployee,
    getEmployee
}