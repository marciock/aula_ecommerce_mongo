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
            let produto=req.params.id;

        imagens.find({'produto':produto,'ativo':'true','dash':'true'}).then((results)=>{
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
                dash:'false',
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
    saveDash:(req,res)=>{
        

        let id=req.body.imagemgrupo;
      
       imagens.findOne({'dash':'true'},(err,data)=>{

       


            data.dash='false' ? 'false':data.dash;
            data.save((err,data)=>{
                


               // res.redirect('/produtos');
                //return data;
            })

            //res.json(data)
        })

        imagens.findOne({'_id':id},(err,data)=>{

            if(err){
                return res.status(500).json({
                    message:'Erro ao buscar o arquivo',
                    error:err
                })
            }
            if(!data){
                return res.status(404).json({
                    message:'Não existente'
                })
            }
    
    
                data.dash='true' ? 'true':data.dash;
                data.save((err,data)=>{
                    
    
    
                    res.redirect('/produtos');
                    //return data;

                    //res.json(data)  
                })
    
                
            })

        

       
        
    }

}