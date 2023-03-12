require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workout')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 4000

// express app
const app = express()

// middleware
app.use(express.json())

var corsOption = {
    origin: 'https://frontend-dardeejay.vercel.app/',
}

app.use(cors(corsOption))
app.use((req, res, next)=>{
    console.log(req.path,req.method)  
    next()
})


app.use('/api/workouts', workoutRoutes)

// connect to db

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listen for request
    app.listen(process.env.PORT || port, ()=>{
        console.log('connected to db * listening on port 4000!!', process.env.PORT)
    } )
})
.catch((err)=>{
    console.log(err)
})


