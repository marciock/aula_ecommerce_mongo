const express = require('express');
const router = express.Router();
const marcas=require('../../controllers/marcas')

/* GET users listing. */


router.get('/:id', marcas.delete);


module.exports = router;
