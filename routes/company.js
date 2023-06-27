var express = require('express');
var router = express.Router();
const controllers = require('../controllers/companyControllers')

/* GET users listing. */
router.post('/register', (req, res, next)=>{
    req.app.verifyToken(req,res,next)
} ,controllers.create)
router.post('/products', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
} , controllers.uploadProduct)

router.put('/products', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
} , controllers.updateProduct)

router.delete('/', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
}, controllers.deleteCompany)
router.delete('/products', (req, res, next)=>{
    req.app.verifyToken(req, res, next)
},controllers.deleteProduct)

router.get('/', (req, res, next)=>{
    req.app.verifyToken(req,res,next)
} ,controllers.getAll)

router.get('/:nit',(req, res, next)=>{
    req.app.verifyToken(req, res, next)
} ,controllers.getByNIT)

module.exports = router;
