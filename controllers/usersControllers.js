const usersSchema = require('../models/usersModels')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

module.exports={
    create:async( req, res, next )=>{
        try {
            const { email, password, statusAdmin } = req.body

            const emailExist = await usersSchema.findOne({email:email})

            if(emailExist){
                res.status(400).json({message:'This user exist.'})
                return
            }

            const document = new usersSchema({
                email:email,
                password:password,
            })

            const docSave = await document.save()
            res.status(201).json({message:'Success register user.'})
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
        }
    },
    login:async(req, res, next)=>{
        try {
            const { email, password } = req.body
            const user = await usersSchema.findOne({email:email})

            if(!user){
                res.status(400).json({message:'This user doesn`t exist'})
            }else{
                if(bcrypt.compareSync(password, user.password)){
                    const token = jwt.sign({userID:user._id}, req.app.get('key'), {expiresIn:'1h'})
                    if(!user.statusAdmin){
                        res.status(200).json({
                            token:token
                        })
                    }else{                       
                        res.status(200).json({
                            token:token,
                            statusAdmin:true
                        })
                    }
                }else{
                    res.status(400).json({message:'Wrong password'})
                }
            }
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
        }
    }
}