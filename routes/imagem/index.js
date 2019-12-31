const express = require('express');
const router = express.Router();
const imagens=require('../../controllers/imagens')

/* GET users listing. */
router.get('/',imagens.tableView )


module.exports = router;
