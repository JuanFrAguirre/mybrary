const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3001
const indexRouter = require('./routes')
require('dotenv').config()
console.clear()

// general config
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

// DB connection
const mongoose = require('mongoose')
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Database'))
  .catch((error) => {
    console.error(error)
  })

// routes
app.use('/', indexRouter)

// app listening
app.listen(
  port,
  console.log(
    `------------- ------------- -------------
Server listening on port ${port}
Open at https://localhost:${port}
------------- ------------- -------------`
  )
)
