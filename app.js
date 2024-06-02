const express =require('express')
const app = new express()

const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')

const xss = require('xss-clean')
const hpp =require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const router = require('./src/routes/api')
require('dotenv').config()

//mongoose Database connected 

const URL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.0ffndnr.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URL).then((res)=>{
    console.log('Database connected ....')
}).catch((err)=>{
    console.log(err)
})


app.use(xss())
app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(cookieParser())
app.use(mongoSanitize())
const limiter = rateLimiter({windowMs:15*60*1000,max:3000})
app.use(limiter)
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))

app.set('etag',false)
app.use('/api/v1', router)



app.use(express.static('client/dist'))
//Add react routing function

app.use('*',function(req,res){
    res.sendFile(path.resolve(__dirname, 'client','dist','index.js'))
})

module.exports =app