const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require('./routes/user')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const connectwithDatabase = async()=>{

    try
    {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log('connected with database')
    }
    catch(err)
    {
        console.log(err)
    }
}
connectwithDatabase()

app.use(bodyParser.json())

app.use(fileUpload({
    useTempFiles : true,
   // tempFileDir : '/tmp/'
}));

app.use(bodyParser.json())


app.use('/user',userRoute)


// mongoose.connect(process.env.MONGO_URI)
//     .then(res=>{
//         console.log('connected with database...')

//     })
//     .catch(err=>{
//         console.log(err)
//     })

// app.get('/test', (req, res) => {
//     res.status(200).json({
//         msg:'test api'
//     })
// })

module.exports = app;