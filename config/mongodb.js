const mongoose = require('mongoose')


mongoose.connect(`mongodb+srv://AdminG:C6gQhHoBSDAKIDIP@imagineappclouster.joazud6.mongodb.net/ImagineApp`)
    .then((res)=>{
    }).catch((error)=>{
        console.error(error)
    })
    
module.exports = mongoose