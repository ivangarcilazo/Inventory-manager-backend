var express = require('express');
var router = express.Router();
const controllers = require('../controllers/usersControllers')

router.post('/register', controllers.create)
router.post('/login', controllers.login)

router.get('/', (req,res)=>{
    res.send('hol')
})

module.exports = router;
