const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usersSchema = mongoose.Schema({
    email:{
        type:String,
        require:[true, 'email field is required']
    },
    password:{
        type:String,
        require:[true, 'password field is required']
    },
    statusAdmin:Boolean
})

usersSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

module.exports = mongoose.model('users', usersSchema)