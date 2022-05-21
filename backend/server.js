const express = require('express') // backend web framework
const dotenv = require('dotenv').config() // env variables
//const{ errorHandler } = require('./middlewear/errorMiddleware')
const port = process.env.PORT || 7999
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))


//app.use(errorHandler)

app.listen(port, () => { console.log(`Server started running on port ${port}`)})