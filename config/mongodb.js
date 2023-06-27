require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(`${process.env.ATLAS_CONNECT}`)
    .then((res)=>{
    }).catch((error)=>{
        console.error(error)
    })
    
module.exports = mongoose