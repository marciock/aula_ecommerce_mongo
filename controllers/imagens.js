const mongoose=require('mongoose')
const imagens=require('../models/imagens');
const produtos=mongoose.model('Produtos');

module.exports={
    listAll:(req,res)=>{
        imagens.find().populate({path:'produto',model:Produtos}).exec((err,data)=>{
                res.json(data)
        })
    },
    tableView:(req,res)=>{
        imagens.find({'ativo':'true'},(err,results)=>{
            produtos.populate(results,{path:'produto'},(err,results)=>{
                res.render('imagens/tableview',{data:results})
                //res.json(results)
            })
        })
     },
     dashView:(req,res)=>{
            let imagem=req.params.id;

        imagens.find({'_id':imagem,'ativo':'true'}).then((results)=>{
            res.json(results);
        })
     },
     listImagens:(req,res)=>{
        let produto=req.params.id;
       // console.log(produto)
     imagens.find({'produto':produto,'ativo':'true'}).then((results)=>{
        res.json(results);
       // res.send(produto);
    })
 },

    new:(req,res)=>{
        let myFiles=req.files;

        myFiles.map((f)=>{
            let newPath=f.path;
            let newImagem=new imagens({
                titulo:f.filename,
                produto:req.body.produto,
                url:newPath.replace('public',''),
                creation:Date(),
                ativo:'true'
            });
            newImagem.save((err,ata)=>{
                if(err){
                    return res.status(500).json({
                        message:'Erro ao Salvar',
                        error:err
                    })
                }
               
            })

        })
        res.redirect('/imagens');
           
    },
    

}