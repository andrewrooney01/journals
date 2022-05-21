const express = require('express') // backend web framework
const colors = require ('colors')
const dotenv = require('dotenv').config() // env variables
const { errorHandler } = require('./middlewear/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 7999

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/entry', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => { console.log(`Server started running on port ${port}`)})