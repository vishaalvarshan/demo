const zlib = require('zlib');
const utf8 = require('utf8');

const zipResponse = async(result, res, statusCode) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let encoded = await utf8.encode(JSON.stringify(result));
    await zlib.gzip(encoded, (err, result) => {
        res.status(statusCode).send(result)
    })
}

module.exports = { zipResponse }