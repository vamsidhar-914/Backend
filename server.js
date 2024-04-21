require('dotenv').config()
const express = require("express")
const app = express()
const path = require("path")
const cors = require('cors')
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents")
const  errorHandler  = require("./middleware/errorHandler")
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require('cookie-parser')
const credentials = require("./middleware/credentials")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 3500

// connect mongo DB 
connectDB();

// custom middleware logger
app.use(logger)

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

app.use(cors(corsOptions)) // cross origin resource sharing

// builtin middleware to handle urlencoded data
app.use(express.urlencoded({ extended : false }))

//built in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

//built in middleware for server static files
app.use(express.static(path.join(__dirname, '/public')))
app.use("/subdir",express.static(path.join(__dirname, '/public')))

// declare routes 
app.use("/" , require("./routes/root")) // basic routes
app.use("/subdir" , require("./routes/subdir")) // subdir routes
app.use("/register" , require("./routes/register"))
app.use("/auth" , require("./routes/login"))
app.use("/refresh" , require("./routes/refresh"))
app.use("/logout" , require("./routes/logout"))

app.use(verifyJWT)
app.use("/employees", require("./routes/api/employees"))
app.use("/posts" , require("./routes/api/posts"))
app.use("/users" ,require("./routes/api/users"))


// page not found
app.all("*" ,(req,res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname , "views" , '404.html'))
    } else if(req.accepts('json')){
        res.json({ error : "404 Not Found !"})
    } else{
        res.type("txt").send('404 Not Found')
    }
})

// error handler
app.use(errorHandler)

mongoose.connection.once("open" , () => {
    console.log('Connected to mongodb')
    app.listen(PORT , () => console.log(`server running on ${PORT}`))
})

