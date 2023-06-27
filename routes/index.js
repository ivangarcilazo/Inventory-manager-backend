var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
    res.send("App is running")
})


module.exports = router;
