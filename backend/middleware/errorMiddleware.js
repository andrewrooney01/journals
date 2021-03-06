// function that execute during request response cycle (when you make a request)
// change default error handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message, // send a message
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // get stack trace only in dev
    })
}
module.exports = {
    errorHandler,
}