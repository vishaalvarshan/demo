const { zipResponse } = require('./compress');
const statusCodes = require('./httpscodes.json');
const Response = require('./response');

class CustomError extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

async function errorHandler(err, req, res, next) {
    let statusCode = statusCodes["BAD_REQUEST"];
    let resp;
    if (err instanceof CustomError) {
        resp = new Response(false, err.message, err.data);
        statusCode = err.statusCode;
    } else if (err instanceof Error) {
        resp = new Response(false, err.message, {});
    } else {
        resp = new Response(false, "Error occurred", {});
    }
    await zipResponse(resp, res, statusCode)
}

module.exports = { errorHandler, CustomError }