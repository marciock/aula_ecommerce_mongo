const express = require('express');
const router = express.Router();
const produtos=require('../../controllers/produtos')

/* GET users listing. */
router.post('/',produtos.saveDash)


module.exports = router;
