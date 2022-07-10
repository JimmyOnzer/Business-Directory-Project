const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1/businessDir'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const busRouter = require('./routers/busRoute')
const catRouter = require('./routers/catRoute')
const cityRouter = require('./routers/cityRoute')
app.use('/busRoute',busRouter)
app.use('/catRoute',catRouter)
app.use('/cityRoute',cityRouter)

app.listen(8000, () => {
    console.log('Server started')
})