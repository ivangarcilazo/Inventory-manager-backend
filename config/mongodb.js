require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(`${process.env.ATLAS_CONNECT}`)
    .then((res)=>{
        console.log('Connected')
    }).catch((error)=>{
        console.log(error)
    })
    
module.exports = mongoose