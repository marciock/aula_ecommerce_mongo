const express = require('express');
const router = express.Router();
const menu=require('../lib/admin')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('menus/admin',{menus:menu})
});

module.exports = router;
