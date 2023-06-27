var express = require('express');
var router = express.Router();
const controllers = require('../controllers/companyControllers')

//POST
router.post('/register', (req, res, next)=>{
    req.app.verifyToken(req,res,next)
} ,controllers.create)
router.post('/products', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
} , controllers.uploadProduct)

//GET
router.get('/', (req, res, next)=>{
    req.app.verifyToken(req,res,next)
} ,controllers.getAll)

router.get('/:nit',(req, res, next)=>{
    req.app.verifyToken(req, res, next)
} ,controllers.getByNIT)

//Modify
router.put('/products', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
} , controllers.updateProduct)
router.put('/modify', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
} , controllers.updatedCompany)


//delete
router.delete('/', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
}, controllers.deleteCompany)
router.delete('/products', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
},controllers.deleteProduct)


module.exports = router;
