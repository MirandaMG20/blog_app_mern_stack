// Set up .env environment
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware') // Not require
const express = require('express')
const app = express()
// Set up Mongoose connection
const connectDB = require('./config/database')

// Bringing in Routes
const authRoute = require('./controllers/userController')
const userRoute = require('./routes/userRoutes')
const blogRoute = require('./routes/blogRoutes')

// Set listening port
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

app.use('/images', express.static(path.join(__dirname, '/images')))

// app.use(cors())
// SETTING UP CORS OPTIONS TO AVOID ACCESS-CONTROL-ALLOW-ORIGIN ISSUES
const corsOption = {
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
    exposeHeaders: ["X-auth-token"],
}
// TRYING TO AVOID THE ACCESS-CONTROL-ALLOW-ORIGIN ISSUE
app.use(cors(corsOption));

// Middleware => Moved it to blogController
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.status(200).json('File has been uploaded')
// })

// Routing 
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/api/blogs', blogRoute)

// This middleware is used to handle errors in the routes
app.use(errorHandler) // Not require