const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3001
require('dotenv').config()

// general config
console.clear()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ limit: '10mb', extended: false }))

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
const indexRouter = require('./routes')
const authorRouter = require('./routes/authors')
app.use('/', indexRouter)
app.use('/authors', authorRouter)

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
