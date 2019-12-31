const express = require('express');
const router = express.Router();
const multer=require('multer')
const imagem=require('../../controllers/imagens')


//let upload=multer({dest:'./files/'});
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/upload/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'.jpg')
    }
})
let upload=multer({storage:storage})

router.post('/',upload.any(),imagem.new);



module.exports = router;
