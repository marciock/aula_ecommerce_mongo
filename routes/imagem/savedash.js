const express = require('express');
const router = express.Router();
const imagens=require('../../controllers/imagens')

/* GET users listing. */
router.post('/',imagens.saveDash)


module.exports = router;
