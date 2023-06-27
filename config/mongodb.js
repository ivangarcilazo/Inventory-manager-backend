const mongoose = require('mongoose')

mongoose.connect(`${env.process.ATLAS_CONNECT}`)
    .then((res)=>{
        console.log('Connected')
    }).catch((error)=>{
        console.log(error)
    })
    
module.exports = mongoose