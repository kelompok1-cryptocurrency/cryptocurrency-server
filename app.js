require("dotenv").config()
const express = require('express')
const app = express()
const router = require('./routes/index.js')
const cors = require("cors")
const PORT = 3000;
const {errorhandling} = require("./middlewares/errorhandling.js")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(errorhandling)

app.listen(PORT, () => {
    console.log('app running', PORT)
})