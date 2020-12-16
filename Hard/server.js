'use strict';

const express = require("express");

const router = express.Router(); // initializes our router

let data = require('./database.json');

// function findEmployee(id) {
//     data.employees.find((employee) => {
//       return parseInt(id) === employee.id
//     })
//     console.log(id)
// }

//REQUEST  GET::myendpointname.com/employees = Returns json with information from all employees.


router.get('/employees', (req,res)=>{
    if(!data){
        res.status(404).send('Could not find information')
    }
    res.status(200).send(data)
})

//GET::myendpointname.com/employees/<employeeID> = Returns json with the information from that specific employee.

router.get('/employees/:id',(req,res)=> {
    const findEmployee = data.employees.find((employee) => {
        return parseInt(req.params.id) === employee.id
    })
    

    if(!findEmployee){
        res.status(404).send('Employee was not found')
    }
    res.status(200).send(findEmployee)
});

// POST POST::myendpointname.com/employees = Inserts new employee into your data. 
// "id": ,
// "name": "",
// "salary": ,
// "department": """

router.post('/employees', (req, res) => {
    
    let newEmployee = {
        id: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department,
    };
    data.employees.push(newEmployee);

    res.status(200).send(`Employee with the name ${newEmployee.name} added to the database!`);
});


// DELETE DELETE::myendpointname.com/employees/<employeeID> = Removes the employee with that ID from the data.

router.delete('/employees/:id', (req, res) => {

    const findEmployee = data.employees.find((employee) => {
        return parseInt(req.params.id) === employee.id
    })
    

    if(!findEmployee){
        res.status(404).send(`Employee with the id ${req.params.id} was not found`)
    }
    // res.status(200).send(findEmployee)

    
    

    data.employees = data.employees.filter((employee) => employee.id !== parseInt(req.params.id)) // makes sure the id matches

    
    res.status(200).send(`Employee with the id ${req.params.id} deleted from the database!`);
});



// UPDATE PUT::myendpointname.com/employees/<employeeID> = Updates information for specified employee.

router.put("/employees/:id", (req, res) => {
    // Find an employee that matches the ID 
    const findEmployee = data.employees.find((employee) => {
        return parseInt(req.params.id) === employee.id;
    });
    // Check if the employee exists
    if (!findEmployee) {
        // Set status code to 404 error
        return res.status(404).send(`Employee with the id ${req.params.id} was not found`);
    }

    

    let updatedEmployee = {
        id: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department,
    };


    // Updates the Name
    findEmployee.name = updatedEmployee.name;
    // Updates the salary
    findEmployee.salary = updatedEmployee.salary;
    // Updates the Department
    findEmployee.department = updatedEmployee.department;

    // Return findEmployee with updated values
    res.send(findEmployee);
});
 

module.exports = router;