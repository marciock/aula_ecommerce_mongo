const express = require('express');
const router = express.Router();
const produtos=require('../../controllers/produtos')

/* GET users listing. */
router.get('/', produtos.tableView);

module.exports = router;
