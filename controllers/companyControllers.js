const companySchema = require('../models/companyModel')

module.exports = {
    create: async(req, res, next)=>{
        try {
            const { name, address, NIT, phone } = req.body
            
            const companyExist = await companySchema.findOne({NIT:NIT})
            if(companyExist){
                res.status(400).json({message:'This company already exist.'})
                return
            }

            const newDocument = new companySchema({
                name:name,
                address:address,
                NIT:NIT,
                phoneNumber:phone,
                inventory:[]
            })
            const doc = await newDocument.save()
            res.status(201).json({message:'Company loaded successfully'})
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
            console.log(error)       
        }
    },
    getAll:async(req, res, next)=>{
        try {
            const documents = await companySchema.find()
            res.status(200).json(documents)
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
            console.log(error)
        }
    },
    getByNIT:async(req, res, next)=>{
        try {
            const { nit } = req.params
            const company = await companySchema.findOne({NIT:nit})
            if(!company){
                res.status(400).json({message:'This company doesnt exist.'})
                return
            }
            res.status(200).json(company)
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
            console.error(error)
        }
    },
    deleteCompany: async(req, res, next)=>{
        try {
            const { nit } = req.body
            const deleteDoc = await companySchema.deleteOne({NIT:nit})
            
            res.status(200).json(deleteDoc)
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
            console.error(error)
        }
    },
    updatedCompany: async(req, res, next)=>{
        try {
            const { oldNIT } = req.body
   
            const upload = await companySchema.findOneAndUpdate({NIT:oldNIT}, req.body)

            res.status(200).json(upload)
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
            console.error(error)
        }
    },
    uploadProduct: async(req, res, next)=>{
        try {
            const { nit, name, quantity, price, description, image } = req.body;
            const data = {
                productName: name,
                productQuantity: quantity,
                productPrice: price,
                productDescription: description,
                productImage: image
            };
    
            const company = await companySchema.findOne({ NIT: nit });
            if (!company) {
                return res.status(400).json({ message: 'This company does not exist.' });
            }
    
            company.inventory.push(data); 
    
            const updatedCompany = await company.save(); 
    
            res.status(201).json({ updatedCompany });
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'There was an unexpected error, try again.'})
        }
    },
    updateProduct: async(req, res, next)=>{
        try {
            const { nit, name, quantity, price, description, image, idProduct } = req.body

            const newDoc = await companySchema.updateOne(
                { 
                  NIT: nit,
                  "inventory._id": idProduct
                },
                {
                  $set: {
                    "inventory.$.productName": name,
                    "inventory.$.productQuantity": quantity,
                    "inventory.$.productPrice": price,
                    "inventory.$.productDescription": description,
                    "inventory.$.productImage": image
                  }
                }
              );
            res.status(200).json(newDoc)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'There was an unexpected error, try again.'})
        }
    },
    deleteProduct: async( req, res, next ) => {
        try {
            const  { idProduct, nit } = req.body
            const document = await companySchema.findOne({NIT:nit})
            const product = document.inventory.find((data)=>{
                const id = data._id
                const stringId = id.toString()
                
                if(stringId===idProduct) return data
            })
            if(product){
                document.inventory.pull(product);
                const savedDocument = await document.save()
                res.status(204).json({message:'product'})
            }else{
                res.status(400).json({message:'This item is not found'})
            }
         
        } catch (error) {
            res.status(500).json({message:'There was an unexpected error, try again.'})
            console.log(error)
        }
    }
}