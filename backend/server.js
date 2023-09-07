// Set up .env environment
require('dotenv').config()
const express = require('express')
const app = express()
// Set up Mongoose connection
const connectDB = require('./config/database')
// Set listening port
const port = process.env.PORT || 3001

// Listener
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

// Connect to the MongoDB
connectDB()

// Middleware
app.use('/api/blogs', require('./routes/blogRoutes'))