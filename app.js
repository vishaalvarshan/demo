const express = require('express');
const cors = require('cors');

const routes = require('./routes');
// const statusCodes = require('./utils/httpStatusCodes.json');
// const Response = require('./utils/response');
// const { zipResponse } = require('./utils/compression');
const { errorHandler } = require('./custom-error-handler');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',routes)

// app.use(errorHandler);

// app.all('*', async(req, res) => {
//     const response = new Response(false, 'Invalid token, please login again', '');
//     await zipResponse(response, res, statusCodes["NOT_FOUND"]);
// })

const port = process.env.APP_PORT || 8000;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});