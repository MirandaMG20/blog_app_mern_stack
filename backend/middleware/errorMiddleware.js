// This middleware is responsible for handling errors that occur during
// the request-response cycle and sending an appropriate response to the client
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    // Pass the status code to the response
    res.status(statusCode)

    // Return a JSON response with an error message and stack trace (in development)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    })
}

module.exports = {
    errorHandler
}