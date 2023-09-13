// Import the Mongoose library & set up Mongoose connection
const mongoose = require('mongoose')

// Function responsible for connecting to the MongoDB database
const connectDB = async () => {
    try {
        // Use await to establish a connection to the MongoDB database specified in the MONGO_URI environment variable
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`) // Log a success message when the connection is established
    } catch (error) {
        console.log(error) // Log any errors that occur during the connection p
        process.exit(1)// Exit the Node.js process with an error code (1) to indicate a failure
    }
}

module.exports = connectDB // Export the connectDB function so it can be used in other parts of your application
