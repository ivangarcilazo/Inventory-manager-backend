const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name of company is required']
    },address:{
        type:String,
        required:[true, 'address of company is required']
    },NIT:{
        type:String,
        required:[true, 'NIT of company is required']
    },
    phoneNumber:{
        type:String,
        required:[true, 'A phone number of company is required']
    },
    inventory:[
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId, 
                auto: true 
            },
            productName: String,
            productQuantity: Number,
            productPrice: Number,
            productDescription: String,
            productImage: String
        }
    ]
})


module.exports = mongoose.model('companies', companySchema)