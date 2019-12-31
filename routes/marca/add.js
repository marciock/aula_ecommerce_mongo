const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/',(req,res)=>{
    res.render('marcas/add')
});

module.exports = router;
