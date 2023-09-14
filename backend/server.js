// Load environment variables from a .env file 
const dotenv = require('dotenv').config()

// Import necessary modules
const path = require('path')
const cors = require('cors')
const express = require('express')
const app = express()

// Import the errorHandler function from a custom middleware (not required)
const { errorHandler } = require('./middleware/errorMiddleware') 

// Import the connectDB function responsible for setting up a Mongoose connection
const connectDB = require('./config/database')

// Import routes for different parts of the application
const authRoute = require('./controllers/userController')
const userRoute = require('./routes/userRoutes')
const blogRoute = require('./routes/blogRoutes')

// Set the listening port for the server
const port = process.env.PORT || 3001

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

// Connect to the MongoDB database using Mongoose
connectDB()

// Middleware to parse incoming JSON data and make it available in req.body
app.use(express.json())

// Middleware to parse incoming URL-encoded data and make it available in req.body
app.use(express.urlencoded({ extended: false }))

// Serve static files (images) from the '/images' directory
app.use('/images', express.static(path.join(__dirname, '/images')))

// app.use(cors())
// Apply CORS middleware with the defined options
// SETTING UP CORS OPTIONS TO AVOID ACCESS-CONTROL-ALLOW-ORIGIN ISSUES
const corsOption = {
    origin: "*", // Allow requests from any origin (for demonstration purposes; you may restrict this)
    methods: "GET, PUT, POST, DELETE, PATCH", // Define the HTTP methods allowed
    credentials: true, // Include credentials (e.g., cookies) in CORS requests
    exposeHeaders: ["X-auth-token"], // Expose custom headers in the response
}
app.use(cors(corsOption));// TRYING TO AVOID THE ACCESS-CONTROL-ALLOW-ORIGIN ISSUE

// Define routes for handling authentication, user-related operations, and blog-related operations
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/api/blogs', blogRoute)

// Apply error handling middleware to handle errors in the routes (not required if handled elsewhere)
app.use(errorHandler) // This line may not be necessary depending on how errors are handled




// Middleware => Moved it to blogController
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.status(200).json('File has been uploaded')
// })