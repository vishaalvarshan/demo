const { query } = require('./db');
const Response = require('./response');
const statusCodes = require('./httpscodes.json');
const { zipResponse } = require('./compress');
const { CustomError } = require('./custom-error-handler');
const { get } = require('./routes');
require('dotenv').config();
const express = require('express');

const read = async (req, res, next) => {
    try {
        let statusCode = statusCodes["OK"];

        const data = await query("SELECT1 * FROM Student");

        if (data instanceof Error) {
            throw new CustomError("Data was not read", statusCodes["BAD_REQUEST"], data.message);
        }
        const response = new Response(true, "read data successfully", data)
        await zipResponse(response, res, statusCode);
    }
    catch (err) {
        next(err);
    }
}

const select_employee_based_on_condition = async (req,res,next) => { 
    try {
        const result = req.query.table;
        let statusCode = statusCodes["OK"];

        const data = await query(`select count(employee.department),department.ID,department.Name from employee
        join ${result}
        on employee.department = department.ID
        group by department;`);

        if(data instanceof Error){
            throw new CustomError("Data was not retreived",statusCodes["BAD_REQUEST"],data.message);
        }
        const response = new Response(true,"data was retreived",data);
        await zipResponse(response,res,statusCode);
    }
    catch(err){
        next(err);
    }
}

module.exports = { read ,select_employee_based_on_condition}