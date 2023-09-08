// Set up .env environment
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware') // Not require
const express = require('express')
const app = express()
// Set up Mongoose connection
const connectDB = require('./config/database')
// Set listening port

const authRoute = require('./routes/authRoutes')

const port = process.env.PORT || 3001

// Listener
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

// Connect to the MongoDB
connectDB()

// This middleware parses incoming JSON data and makes it available in req.body
app.use(express.json())
// This middleware parses incoming URL-encoded data and makes it available in req.body
app.use(express.urlencoded({ extended: false }))

// Middleware
app.use('/api/blogs', require('./routes/blogRoutes'))
app.use('/auth', require('./routes/authRoutes'))

// This middleware is used to handle errors in the routes
app.use(errorHandler) // Not require