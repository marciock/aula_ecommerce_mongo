const express = require('express');
const router = express.Router();
const produtos=require('../../controllers/produtos')

/* GET users listing. */


router.get('/:id', produtos.delete);


module.exports = router;
